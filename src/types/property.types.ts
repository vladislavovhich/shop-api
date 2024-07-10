import { Request } from 'express';
import Joi from 'joi';

export interface CreateRequest extends Request {
    body: {
        typeId: string,
        name: string
    }
}

export interface UpdateRequest extends Request {
    body: {
        typeId: string,
        name: string
    },
    params: {
        id: string
    }
}

export const PropertySchema = Joi.object({
    typeId: Joi.number().integer().min(1).required(),
    name: Joi.string().min(1).required()
})