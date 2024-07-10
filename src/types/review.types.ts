import { Request } from 'express';
import Joi from 'joi';

export interface CreateRequest extends Request {
    params: {
        productId: string
    },

    body: {
        rating: string,
        text: string
    }
}

export interface UpdateRequest extends Request {
    params: {
        productId: string,
        reviewId: string
    },

    body: {
        rating: string,
        text: string
    }
}

export interface ReviewIdRequest extends Request {
    params: {
        productId: string,
        reviewId: string
    }
}

export const CreateReviewParamsSchema = Joi.object({
    productId: Joi.number().integer().min(1).required()
})

export const ReviewReqSchema = Joi.object({
    rating: Joi.number().integer().min(1).max(10).required(),
    text: Joi.string().required()
})

export const ReviewIdReqSchema = Joi.object({
    productId: Joi.number().integer().min(1).required(),
    reviewId: Joi.number().integer().min(1).required()
})