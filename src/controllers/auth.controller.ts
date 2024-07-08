import { Request, Response } from "express"
import { CreateUserRequest, ITokens, LoginUserRequest } from "../types/auth.types"
import { AuthService } from "../services/auth.service"
import { CreateUserDto } from "../dto/user/user-create.dto"
import { LoginUserDto } from "../dto/user/user-login.dto"
import { StatusCodes } from "http-status-codes"
import { BadRequest } from "@tsed/exceptions"
import { User } from "../models/user.model"

export const AuthController = {
    register: async (req: CreateUserRequest , res: Response) => {
        const user = await AuthService.register(new CreateUserDto({
            email: req.body.email,
            password: req.body.password,
            roleId: parseInt(req.body.roleId)
        }))

        res.status(StatusCodes.OK).send({ user })
    },

    login: async (req: LoginUserRequest, res: Response) => {
        const loginUserDto = new LoginUserDto({
            email: req.body.email, 
            password: req.body.password
        })

        const result = await AuthService.authorize(loginUserDto)

        res.cookie("jwt", result.tokens.accessToken, {httpOnly: true, secure: true})

        res.status(StatusCodes.OK).send({user: result.user})
    },

    refreshToken: async (req: Request, res: Response) => {
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
        res.clearCookie('jwt')

        res.sendStatus(StatusCodes.OK)
    }
}