import { Request } from "express"
import { User } from "../models/user.model"
import { ITokens } from "./common.types"
import Joi from "joi"

export interface IAuthResult {
    token: string,
    user: User
}

export interface IRegisterResult {
    tokens: ITokens,
    user: User
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

export const CreateUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(5).max(30).required(),
    roleId: Joi.number().min(1).required(),
    name: Joi.string().min(1).required(),
    birthDate: Joi.date().required()
})

export const UpdateUserProfileSchema = Joi.object({
    name: Joi.string().min(1).required(),
    birthDate: Joi.date().required()
})

export const LoginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(5).max(30).required()
})