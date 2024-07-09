import { CreateUserRequest, ITokens, LoginUserRequest, UpdateUserProfileRequest } from "../types/user.types"
import { CreateUserDto } from "../dto/user/user-create.dto"
import { LoginUserDto } from "../dto/user/user-login.dto"
import { AuthService } from "../services/auth.service"
import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { User } from "../models/user.model"

export const AuthController = {
    register: async (req: CreateUserRequest , res: Response) => {
        // #swagger.tags = ['Auth']

        const {user, tokens} = await AuthService.register(new CreateUserDto({
            email: req.body.email,
            password: req.body.password,
            roleId: parseInt(req.body.roleId),
            name: req.body.name,
            birthDate: new Date(req.body.birthDate)
        }))

        res.cookie("jwt", tokens.accessToken, {httpOnly: true, secure: true})
        res.status(StatusCodes.OK).send({ user })
    },


    login: async (req: LoginUserRequest, res: Response) => {
        // #swagger.tags = ['Auth']

        const loginUserDto = new LoginUserDto({
            email: req.body.email, 
            password: req.body.password
        })

        const result = await AuthService.login(loginUserDto)

        res.cookie("jwt", result.token, {httpOnly: true, secure: true})

        res.status(StatusCodes.OK).send({user: result.user})
    },

    refreshToken: async (req: Request, res: Response) => {
        // #swagger.tags = ['Auth']

        const user = (await req.user) as User

        await AuthService.refreshToken(user.token, (result: ITokens) => {
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
        // #swagger.tags = ['Auth']

        res.clearCookie('jwt')

        res.sendStatus(StatusCodes.OK)
    }
}