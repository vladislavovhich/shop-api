import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { CreateRequest, UpdateRequest } from '../types/property.types'
import { IdRequest } from '../types/common.types'
import { PropertyService } from '../services/property.service'
import { PropertyDtoMapper } from '../mappers/property.mapper'

export const PropertyController = {
    create: async (req: CreateRequest, res: Response) => {
        const createPropertyDto = PropertyDtoMapper.mapCreateDto(req)
        const property = await PropertyService.create(createPropertyDto)

        res.status(StatusCodes.OK).send({
            property
        })
    },

    delete: async (req: IdRequest, res: Response) => {
        const propertyId = parseInt(req.params.id)
        
        await PropertyService.delete(propertyId)

        res.status(StatusCodes.OK).send({
            message: "Property successfully deleted"
        })
    },

    update: async (req: UpdateRequest, res: Response) => {
        const updatePropertyDto = PropertyDtoMapper.mapUpdateDto(req)
        const property = await PropertyService.update(updatePropertyDto)

        res.status(StatusCodes.OK).send({
            property
        })
    },

    get: async (req: IdRequest, res: Response) => {
        const propertyId = parseInt(req.params.id)
        const property = await PropertyService.get(propertyId)

        res.status(StatusCodes.OK).send({
            property
        })
    },

    getAll: async (req: Request, res: Response) => {    
        const properties = await PropertyService.getAll()

        res.status(StatusCodes.OK).send({
            properties
        })
    },
}