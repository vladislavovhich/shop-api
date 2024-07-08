import bcrypt from "bcrypt"
import jwt, { JwtPayload } from "jsonwebtoken"
import { ITokens, IAuthResult, IPayload, IRegisterResult } from "../types/user.types"
import { ICreateUserDto } from "../dto/user/user-create.dto"
import { ILoginUserDto } from "../dto/user/user-login.dto"
import { User } from "../models/user.model"
import { Role } from "../models/role.model"
import { BadRequest, NotFound } from "@tsed/exceptions"
import { ProfileService } from "./profile.service"
import { Profile } from "../models/profile.model"

export const UserService = {
    register: async (createUserDto: ICreateUserDto): Promise<IRegisterResult> => {
        const role = await Role.findByPk(createUserDto.roleId)
        const userExist = await UserService.findByEmail(createUserDto.email)

        if (userExist) {
            throw new BadRequest("Login is already taken")
        }

        if (!role) {
            throw new NotFound("Role not found")
        }

        const password = await bcrypt.hash(createUserDto.password, 10)
        const user = await User.create({ email: createUserDto.email, password, roleId: role.id, token: ""})
        const accessToken = await UserService.getAccessToken(user.id)
        const refreshToken = await UserService.getRefreshToken(user.id)

        createUserDto.profile.userId = user.id
        
        await ProfileService.create(createUserDto.profile)
        await user.update({token: refreshToken})
        await user.reload({include: [Profile]})

        return {user, tokens: {accessToken, refreshToken}}
    },

    findByEmail: async (email: string): Promise<User | null> => {
        const user = await User.findOne({where: {email}})

        return user
    },

    findById: async (id: number): Promise<User> => {
        const user = await User.findByPk(id, {
            include: [Profile]
        })

        if (!user) {
            throw new NotFound("User not found")
        }

        return user
    },

    authorize: async (loginUserDto: ILoginUserDto): Promise<IAuthResult> => {
        const user = await UserService.findByEmail(loginUserDto.email)

        if (!user) {
            throw new BadRequest("Incorrect login or password")
        }

        const compareResult = await bcrypt.compare(loginUserDto.password, user.password)

        if (!compareResult) {
            throw new BadRequest("Incorrect login or password")
        }

        const token = await UserService.getAccessToken(user.id)

        return {user, token}
    },

    getAccessToken: async (userId: number): Promise<string> => {
        const accessToken = jwt.sign({id: userId}, "secret", {expiresIn: "1d"})

        return accessToken
    },

    getRefreshToken: async (userId: number): Promise<string> => {
        const refreshToken = jwt.sign({ id: userId }, "refresh_secret", { expiresIn: '7d' })

        return refreshToken
    },

    refreshToken: async (refreshToken: string, callback: (tokens: ITokens) => void): Promise<void> => {
        jwt.verify(refreshToken, "refresh_secret", async (err, res) => {
            if (err) {
                throw new BadRequest(err.message)
            }

            const payload = res as IPayload
            const user = await User.findByPk(payload.id)

            if (!user) {
                throw new NotFound("User not found")
            }
            
            const accessToken = await UserService.getAccessToken(user.id)
            const refreshToken = await UserService.getRefreshToken(user.id)

            await user.update({token: refreshToken})

            return callback({accessToken, refreshToken})
        })
    }
}