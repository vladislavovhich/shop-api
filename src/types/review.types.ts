import { Request } from 'express';

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

export interface IdRequest extends Request {
    params: {
        productId: string,
        reviewId: string
    }
}

export interface IdProductRequest extends Request {
    params: {
        id: string
    }
}