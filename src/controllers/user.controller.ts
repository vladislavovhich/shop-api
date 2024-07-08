import { Request, Response } from "express"
import { CreateUserRequest, ITokens, LoginUserRequest, UpdateUserProfileRequest } from "../types/user.types"
import { UserService } from "../services/user.service"
import { CreateUserDto } from "../dto/user/user-create.dto"
import { LoginUserDto } from "../dto/user/user-login.dto"
import { StatusCodes } from "http-status-codes"
import { BadRequest } from "@tsed/exceptions"
import { User } from "../models/user.model"
import { CreateProfileDto } from "../dto/profile/profile-create.dto"
import { ProfileService } from "../services/profile.service"
import { UpdateProfileDto } from "../dto/profile/profile-update.dto"
import { IdRequest } from "../types/property.types"

export const UserController = {
    register: async (req: CreateUserRequest , res: Response) => {
        const {user, tokens} = await UserService.register(new CreateUserDto({
            email: req.body.email,
            password: req.body.password,
            roleId: parseInt(req.body.roleId),
            profile: new CreateProfileDto({
                userId: 0,
                name: req.body.name,
                birthDate: new Date(req.body.birthDate)
            })
        }))

        res.cookie("jwt", tokens.accessToken, {httpOnly: true, secure: true})
        res.status(StatusCodes.OK).send({ user })
    },

    updateProfile: async (req: UpdateUserProfileRequest, res: Response) => {
        const profile = await ProfileService.update(new UpdateProfileDto({
            name: req.body.name,
            birthDate: new Date(req.body.birthDate),
            profileId: parseInt(req.params.id)
        }))

        const user = await UserService.findById(profile.userId)

        res.status(StatusCodes.OK).send({ user })
    },

    deleteAccount: async (req: Request, res: Response) => {
        const user = await req.user

        console.log(user)   
    },

    login: async (req: LoginUserRequest, res: Response) => {
        const loginUserDto = new LoginUserDto({
            email: req.body.email, 
            password: req.body.password
        })

        const result = await UserService.authorize(loginUserDto)

        res.cookie("jwt", result.token, {httpOnly: true, secure: true})

        res.status(StatusCodes.OK).send({user: result.user})
    },

    refreshToken: async (req: Request, res: Response) => {
        const user = (await req.user) as User

        await UserService.refreshToken(user.token, (result: ITokens) => {
            if (!result) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: 'No refresh token specified'
                })
            }

            res.cookie("jwt", result.accessToken, {httpOnly: true, secure: true})
            res.sendStatus(StatusCodes.OK)
        }) 
    },

    logout: async (req: Request, res: Response) => {
        res.clearCookie('jwt')

        res.sendStatus(StatusCodes.OK)
    }
}