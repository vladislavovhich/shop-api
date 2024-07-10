import { Request } from 'express';
import Joi from "joi"

export interface CreateRequest extends Request {
    body: {
        name: string
    }
}

export interface UpdateRequest extends Request {
    body: {
        name: string
    },
    params: {
        id: string
    }
}

export interface PropertyActionRequest extends Request {
    params: {
        propertyId: string,
        categoryId: string
    }
}

export const CategoryReqSchema = Joi.object({
    name: Joi.string().min(1).max(50).required()
})


export const CategoryPropertySchema = Joi.object({
    propertyId: Joi.number().min(1).required(),
    categoryId: Joi.number().min(1).required()
})