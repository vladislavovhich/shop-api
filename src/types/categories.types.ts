import { Request } from 'express';

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

export interface IdRequest extends Request {
    params: {
        id: string
    }
}
