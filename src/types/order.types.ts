import { Request } from 'express';
import Joi from "joi"

export interface MakeOrderRequest extends Request {
    params: {
        id: string
    },
    
    body: {
        amount: string,
    }
}

export const MakeOrderSchema = Joi.object({
    amount: Joi.number().integer().min(1).required()
})
