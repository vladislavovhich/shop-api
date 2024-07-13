import { Request } from 'express';
import { IPropertyDto } from '../dto/product/product-create.dto';
import { Product } from '../models/product.model';
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

export interface IGetAllResult {
    products: Product[],
    nextPage?: number
    prevPage?: number
}

export interface GetAllRequest extends Request {
    query: {
        nameSort?: string
        priceSort?: string
        ratingSort?: string
        nameFilter?: string
        categoryId?: string
        page?: string
        pageSize?: string
    }
}

export const GetProductsSchema = Joi.object({
    nameSort: Joi.string().valid("ASC", "DESC").insensitive().allow(null),
    priceSort: Joi.string().valid("ASC", "DESC").insensitive().allow(null),
    ratingSort: Joi.string().valid("ASC", "DESC").insensitive().allow(null),
    nameFilter: Joi.string().min(1).max(50).allow(null),
    page: Joi.number().integer().min(1).allow(null),
    pageSize: Joi.when('page', {
        is: Joi.exist().not(null),
        then: Joi.number().integer().min(1).required(),
        otherwise: Joi.number().integer().min(1).allow(null)
    })
})

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