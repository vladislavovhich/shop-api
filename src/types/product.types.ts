import { Request } from 'express';
import { IPropertyDto } from '../dto/product/product-create.dto';
import Joi from 'joi';

export interface ICartProduct {
    productId: number,
    userId: number
}

export interface CreateRequest extends Request {
    body: {
        name: string,
        price: string,
        categoryId: string,
        properties: IPropertyDto[]
    }
}

export interface UpdateRequest extends Request {
    body: {
        name: string,
        price: string,
        categoryId: string
        properties: IPropertyDto[]
    },
    params: {
        id: string
    }
}

const propertySchema = Joi.object({
    propertyId: Joi.number().integer().min(1).required(),
    value: Joi.string().min(1).required(),
    name: Joi.string().min(1).required()
})

export const CreateProductSchema = Joi.object({
    name: Joi.string().min(1).required(),
    price: Joi.number().min(1).required(),
    categoryId: Joi.number().integer().min(1).required(),
    properties: Joi.array().items(propertySchema).required()
})