import { CreateUserRequest, LoginUserRequest } from "../types/user.types"
import { IdRequest, ITokens } from "../types/common.types"
import { UserDtoMapper } from "../mappers/user.mapper"
import { AuthService } from "../services/auth.service"
import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { UserService } from "../services/user.service"
import { BadRequest } from "@tsed/exceptions"

export const AuthController = {
    register: async (req: CreateUserRequest , res: Response) => {
        const createUserdto = UserDtoMapper.mapCreateDto(req)
        const {user, tokens} = await AuthService.register(createUserdto)

        res.cookie("jwt", tokens.accessToken, {httpOnly: true, secure: true})
        res.status(StatusCodes.OK).send({ user })
    },

    login: async (req: LoginUserRequest, res: Response) => {
        const loginUserDto = UserDtoMapper.mapLoginDto(req)
        const result = await AuthService.login(loginUserDto)
        
        res.cookie("jwt", result.token, {httpOnly: true, secure: true})
        res.status(StatusCodes.OK).send({user: result.user})
    },

    refreshToken: async (req: Request, res: Response) => {
        const user = await UserService.extractUserFromReq(req)

        await AuthService.refreshToken(user.token, (result: ITokens) => {
            if (!result) {
                throw new BadRequest("No token specified")
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