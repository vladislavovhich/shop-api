import { Request } from 'express';

export interface MakeOrderRequest extends Request {
    params: {
        id: string
    },
    
    body: {
        amount: string,
    }
}

export interface IdRequest extends Request {
    params: {
        id: string
    }
}