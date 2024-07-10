import { Request } from "express"
import { User as UserModel } from "../models/user.model"
import { JwtPayload } from "jsonwebtoken"
import Joi from "joi"

export interface IdRequest extends Request {
    params: {
        id: string
    }
}

declare global {
    namespace Express {
        export interface User extends UserModel {}
    }
}

export interface IPayload extends JwtPayload {
    id: number
}

export interface ITokens {
    accessToken: string
    refreshToken: string
}

export const GetByIdSchema = Joi.object({
    id: Joi.number().integer().min(1).required()
})