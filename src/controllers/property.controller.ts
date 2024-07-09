import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { CreateRequest, IdRequest, UpdateRequest } from '../types/property.types'
import { CreatePropertyDto } from '../dto/property/property-update.dto'
import { PropertyService } from '../services/property.service'
import { UpdatePropertyDto } from '../dto/property/property-create.dto'

export const PropertyController = {
    create: async (req: CreateRequest, res: Response) => {
        // #swagger.tags = ['Property']

        const property = await PropertyService.create(new CreatePropertyDto({
            typeId: parseInt(req.body.typeId), 
            name: req.body.name
        }))

        res.status(StatusCodes.OK).send({
            property
        })
    },

    delete: async (req: IdRequest, res: Response) => {
        // #swagger.tags = ['Property']

        const propertyId = parseInt(req.params.id)
        
        await PropertyService.delete(propertyId)

        res.status(StatusCodes.OK).send({
            message: "Property successfully deleted"
        })
    },

    update: async (req: UpdateRequest, res: Response) => {
        // #swagger.tags = ['Property']

        const propertyId = parseInt(req.params.id)
        const typeId = parseInt(req.body.typeId)
 
        const property = await PropertyService.update(new UpdatePropertyDto({
            id: propertyId,
            typeId, 
            name: req.body.name
        }))

        res.status(StatusCodes.OK).send({
            property
        })
    },

    get: async (req: IdRequest, res: Response) => {
        // #swagger.tags = ['Property']

        const propertyId = parseInt(req.params.id)
        const property = await PropertyService.get(propertyId)

        res.status(StatusCodes.OK).send({
            property
        })
    },

    getAll: async (req: Request, res: Response) => {
        // #swagger.tags = ['Property']
        
        const properties = await PropertyService.getAll()

        res.status(StatusCodes.OK).send({
            properties
        })
    },
}