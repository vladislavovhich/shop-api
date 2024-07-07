import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { CreateRequest, UpdateRequest, IdRequest, PropertyActionRequest } from '../types/categories.types'
import Category from '../models/category.model'
import Property from '../models/property.model'
import { CategoryService } from '../services/category.service'
import { CreateCategoryDto } from '../dto/category/category-create.dto'
import { UpdateCategoryDto } from '../dto/category/category-update.dto'
import { CategoryPropertyDto } from '../dto/category/category-property.dto'
import { PropertyService } from '../services/property.service'
import { BadRequest } from '@tsed/exceptions'

const CategoriesController = {
    create: async (req: CreateRequest, res: Response) => {
        const category = await CategoryService.create(new CreateCategoryDto({
            name: req.body.name
        }))

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
        const categoryId = parseInt(req.params.id)
        
        const category = await CategoryService.update(new UpdateCategoryDto({
            name: req.body.name,
            id: categoryId
        }))

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
        const propertyId = parseInt(req.params.propertyId)
        const categoryId = parseInt(req.params.categoryId)

        const category = await CategoryService.addProperty(new CategoryPropertyDto({
            propertyId, 
            categoryId
        }))

        res.status(StatusCodes.OK).send({
            category
        })
    },

    removeProperty: async (req: PropertyActionRequest, res: Response) => {
        const propertyId = parseInt(req.params.propertyId)
        const categoryId = parseInt(req.params.categoryId)

        const category = await CategoryService.removeProperty(new CategoryPropertyDto({
            propertyId, 
            categoryId
        }))

        res.status(StatusCodes.OK).send({
            category
        })
    }
}


export default CategoriesController