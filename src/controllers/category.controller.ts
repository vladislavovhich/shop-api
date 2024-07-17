import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { CreateRequest, UpdateRequest, PropertyActionRequest } from '../types/category.types'
import { IdRequest } from '../types/common.types'
import { CategoryService } from '../services/category.service'
import { CategoryDtoMapper } from '../mappers/category.mapper'

export const CategoryController = {
    create: async (req: CreateRequest, res: Response) => {
        const createCategoryDto = CategoryDtoMapper.mapCreateDto(req)
        const category = await CategoryService.create(createCategoryDto)

        res.status(StatusCodes.OK).send({
            category
        })
    },

    delete: async (req: IdRequest, res: Response) => {
        const categoryId = parseInt(req.params.id)
        
        await CategoryService.delete(categoryId)

        res.status(StatusCodes.OK).send({
            message: "Category successfully deleted"
        })
    },

    update: async (req: UpdateRequest, res: Response) => {
        const updateCategoryDto = CategoryDtoMapper.mapUpdateDto(req)
        const category = await CategoryService.update(updateCategoryDto)

        res.status(StatusCodes.OK).send({
            category
        })
    },

    get: async (req: IdRequest, res: Response) => {
        const categoryId = parseInt(req.params.id)
        const category = await CategoryService.get(categoryId)

        res.status(StatusCodes.OK).send({
            category
        })
    },

    getAll: async (req: Request, res: Response) => {
        const categories = await CategoryService.getAll()

        res.status(StatusCodes.OK).send({
            categories
        })
    },

    addProperty: async (req: PropertyActionRequest, res: Response) => {
        const categoryPropertyDto = CategoryDtoMapper.mapPropertyDto(req)
        const category = await CategoryService.addProperty(categoryPropertyDto)

        res.status(StatusCodes.OK).send({
            category
        })
    },

    removeProperty: async (req: PropertyActionRequest, res: Response) => {
        const categoryPropertyDto = CategoryDtoMapper.mapPropertyDto(req)
        const category = await CategoryService.removeProperty(categoryPropertyDto)

        res.status(StatusCodes.OK).send({
            category
        })
    },

    getCategoryProperties: async (req: IdRequest, res: Response) => {
        const categoryId = parseInt(req.params.id)
        const category = await CategoryService.getCategoryProperties(categoryId)

        res.status(StatusCodes.OK).send({
            category
        })
    }
}