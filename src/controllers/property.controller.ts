import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { CreateRequest, IdRequest, UpdateRequest } from '../types/property.types'
import Type from '../models/type.model'
import Property from '../models/property.model'
import { BadRequest, NotFound } from '@tsed/exceptions'

const PropertyController = {
    create: async (req: CreateRequest, res: Response) => {
        const typeId = parseInt(req.body.typeId)
        const type = await Type.findByPk(typeId) 

        if (!type) {
            throw new BadRequest("Type not found")
        }

        const property = await Property.create({ 
            type, 
            name: req.body.name 
        })

        await property.setType(type)
        await property.reload({ include: Type })

        res.status(StatusCodes.OK).send({
            property
        })
    },

    delete: async (req: IdRequest, res: Response) => {
        const propertyId = parseInt(req.params.id)
        const property = await Property.findByPk(propertyId)

        if (!property) {
            throw new NotFound("Property not found")
        }

        await property.destroy()

        res.status(StatusCodes.OK).send({
            message: "Property successfully deleted"
        })
    },

    update: async (req: UpdateRequest, res: Response) => {
        const propertyId = parseInt(req.params.id)
        const property = await Property.findByPk(propertyId, {
            include: Type
        })
        
        const typeId = parseInt(req.body.typeId)
        const type = await Type.findByPk(typeId) 

        if (!type) {
            return res.status(StatusCodes.NOT_FOUND).send({
                message: "Type not found"
            })
        }

        if (!property) {
            return res.status(StatusCodes.NOT_FOUND).send({
                message: "Property not found"
            })
        }

        await property.update({name: req.body.name})
        await property.setType(type)

        await property.reload({ include: Type })

        res.status(StatusCodes.OK).send({
            property
        })
    },

    get: async (req: IdRequest, res: Response) => {
        const propertyId = parseInt(req.params.id)
        const property = await Property.findByPk(propertyId, {
            include: Type
        })

        if (!property) {
            return res.status(StatusCodes.NOT_FOUND).send({
                message: "Property not found"
            })
        }

        res.status(StatusCodes.OK).send({
            property
        })
    },

    getAll: async (req: Request, res: Response) => {
        const properties = await Property.findAll({
            include: Type
        })

        res.status(StatusCodes.OK).send({
            properties
        })
    },
}


export default PropertyController