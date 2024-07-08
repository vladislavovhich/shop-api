import bcrypt from "bcrypt"
import jwt, { JwtPayload } from "jsonwebtoken"
import { ITokens, IAuthResult, IPayload } from "../types/auth.types"
import { ICreateUserDto } from "../dto/user/user-create.dto"
import { ILoginUserDto } from "../dto/user/user-login.dto"
import { User } from "../models/user.model"
import { Role } from "../models/role.model"
import { BadRequest, NotFound } from "@tsed/exceptions"

export const AuthService = {
    register: async (createUserDto: ICreateUserDto): Promise<User> => {
        const role = await Role.findByPk(createUserDto.roleId)

        const userExist = await AuthService.findByEmail(createUserDto.email)

        if (userExist) {
            throw new BadRequest("Login is already taken")
        }

        if (!role) {
            throw new NotFound("Role not found")
        }

        const password = await bcrypt.hash(createUserDto.password, 10)
        const user = await User.create({ email: createUserDto.email, password, roleId: role.id, token: ""})
        const tokens = await AuthService.getTokens(user.id)

        await user.update({token: tokens.refreshToken})

        return user
    },

    findByEmail: async (email: string): Promise<User | null> => {
        const user = await User.findOne({where: {email}})

        return user
    },

    authorize: async (loginUserDto: ILoginUserDto): Promise<IAuthResult> => {
        const user = await AuthService.findByEmail(loginUserDto.email)

        if (!user) {
            throw new BadRequest("Incorrect login or password")
        }

        const compareResult = await bcrypt.compare(loginUserDto.password, user.password)

        if (!compareResult) {
            throw new BadRequest("Incorrect login or password")
        }

        const tokens = await AuthService.getTokens(user.id)

        return {user, tokens}
    },

    getTokens: async (userId: number): Promise<ITokens> => {
        const accessToken = jwt.sign({id: userId}, "secret", {expiresIn: "1d"})
        const refreshToken = jwt.sign({ id: userId }, "refresh_secret", { expiresIn: '7d' })

        return {accessToken, refreshToken}
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
            
            const tokens = await AuthService.getTokens(user.id)

            await user.update({token: tokens.refreshToken})

            return callback(tokens)
        });
    }
}