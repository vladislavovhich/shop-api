import { Request, Response, NextFunction } from "express";
import Joi, { extend } from "joi"
import { BadRequest } from "@tsed/exceptions";

export const isValid = <T extends Request>(schema: Joi.Schema, property: keyof T) => { 
    return (req: T, res: Response, next: NextFunction) => { 
        const { error } = schema.validate(req[property])
        const valid = error == null
        
        if (valid) { 
            next()
        } else { 
            const { details } = error; 
            const message = details.map(i => i.message).join(',')
            
            throw new BadRequest(message) 
        } 
    } 
} 