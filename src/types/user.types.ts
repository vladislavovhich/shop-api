import { Request } from "express"
import { User as UserModel } from "../models/user.model"
import { JwtPayload } from "jsonwebtoken"

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

export interface IAuthResult {
    token: string,
    user: UserModel
}

export interface IRegisterResult {
    tokens: ITokens,
    user: UserModel
}

export interface CreateUserRequest extends Request {
    body: {
        email: string,
        password: string,
        roleId: string,
        name: string,
        birthDate: string
    }
}

export interface UpdateUserProfileRequest extends Request {
    body: {
        name: string,
        birthDate: string
    }
}

export interface LoginUserRequest extends Request {
    body: {
        email: string,
        password: string
    }
}