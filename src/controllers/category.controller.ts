import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { CreateRequest, UpdateRequest, IdRequest, PropertyActionRequest } from '../types/categories.types'
import Category from '../models/category.model'
import Property from '../models/property.model'

const CategoriesController = {
    create: async (req: CreateRequest, res: Response) => {
        const category = await Category.create({ 
            name: req.body.name 
        })

        res.status(StatusCodes.OK).send({
            category
        })
    },

    delete: async (req: IdRequest, res: Response) => {
        const categoryId = parseInt(req.params.id)
        const category = await Category.findByPk(categoryId)

        if (!category) {
            return res.status(StatusCodes.NOT_FOUND).send({
                message: "Category not found"
            })
        }

        await category.destroy()

        res.status(StatusCodes.OK).send({
            message: "Category successfully deleted"
        })
    },

    update: async (req: UpdateRequest, res: Response) => {
        const categoryId = parseInt(req.params.id)
        const category = await Category.findByPk(categoryId)
        
        if (!category) {
            return res.status(StatusCodes.NOT_FOUND).send({
                message: "Category not found"
            })
        }

        await category.update({name: req.body.name})

        res.status(StatusCodes.OK).send({
            category
        })
    },

    get: async (req: IdRequest, res: Response) => {
        const categoryId = parseInt(req.params.id)
        const category = await Category.findByPk(categoryId)

        if (!category) {
            return res.status(StatusCodes.NOT_FOUND).send({
                message: "Category not found"
            })
        }

        res.status(StatusCodes.OK).send({
            category
        })
    },

    getAll: async (req: Request, res: Response) => {
        const categories = await Category.findAll()

        res.status(StatusCodes.OK).send({
            categories
        })
    },

    addProperty: async (req: PropertyActionRequest, res: Response) => {
        const propertyId = parseInt(req.params.propertyId)
        const categoryId = parseInt(req.params.categoryId)

        const category = await Category.findByPk(categoryId)
        const property = await Property.findByPk(propertyId)

        if (!category) {
            return res.status(StatusCodes.NOT_FOUND).send({
                message: "Category not found"
            })
        }

        if (!property) {
            return res.status(StatusCodes.NOT_FOUND).send({
                message: "Property not found"
            })
        }

        const hasProperty = await category.hasProperty(property)

        if (hasProperty) {
            return res.status(StatusCodes.BAD_REQUEST).send({
                message: `You've already added property '${property.name}' to category '${category.name}'`
            })
        }

        await category.addProperty(property)
        await category.reload({ include: [Property] })

        return res.status(StatusCodes.NOT_FOUND).send({
            category
        })
    },

    removeProperty: async (req: PropertyActionRequest, res: Response) => {
        const propertyId = parseInt(req.params.propertyId)
        const categoryId = parseInt(req.params.categoryId)

        const category = await Category.findByPk(categoryId)
        const property = await Property.findByPk(propertyId)

        if (!category) {
            return res.status(StatusCodes.NOT_FOUND).send({
                message: "Category not found"
            })
        }

        if (!property) {
            return res.status(StatusCodes.NOT_FOUND).send({
                message: "Property not found"
            })
        }

        const hasProperty = await category.hasProperty(property)

        if (!hasProperty) {
            return res.status(StatusCodes.BAD_REQUEST).send({
                message: `Category '${category.name}' has no property '${property.name}', so you can't remove it`
            })
        }

        await category.removeProperty(property)
        await category.reload({ include: [Property] })

        return res.status(StatusCodes.NOT_FOUND).send({
            category
        })
    }
}


export default CategoriesController