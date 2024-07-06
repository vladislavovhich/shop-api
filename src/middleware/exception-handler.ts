import { Request, Response, NextFunction } from 'express'
import { HttpError } from 'http-errors'

export const exceptionHandler = (error: HttpError, req: Request,res: Response, next: NextFunction) => {
    const statusCode = error.status 
    const message = error.message

    return res.status(statusCode).send({ message })
}