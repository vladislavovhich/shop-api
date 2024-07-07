import { Request } from 'express';
import { IPropertyDto } from '../dto/product/product-create.dto';

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

export interface IdRequest extends Request {
    params: {
        id: string
    }
}
