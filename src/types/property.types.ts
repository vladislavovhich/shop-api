import { Request } from 'express';

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

export interface IdRequest extends Request {
    params: {
        id: string
    }
}
