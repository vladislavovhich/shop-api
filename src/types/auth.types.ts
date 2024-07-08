import { Request } from "express"
import { User } from "../models/user.model"
import { JwtPayload } from "jsonwebtoken"

declare global {
    namespace Express {
        interface Request {
            user?: User
        }
    }
}

export interface IPayload extends JwtPayload {
    id: number
}

export interface ITokens {
    accessToken: string
    refreshToken: string
}

export interface IAuthResult {
    tokens: ITokens,
    user: User
}

export interface CreateUserRequest extends Request {
    body: {
        email: string,
        password: string,
        roleId: string
    }
}

export interface LoginUserRequest extends Request {
    body: {
        email: string,
        password: string
    }
}