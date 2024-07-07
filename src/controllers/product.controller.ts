import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { CreateRequest, UpdateRequest } from "../types/product.types"
import { ProductService } from "../services/product.service"
import { CreateProductDto, IPropertyDto, PropertyDto } from "../dto/product/product-create.dto"
import { UpdateProductDto } from "../dto/product/update-product.dto"
import { IdRequest } from "../types/property.types"
import { CategoryService } from "../services/category.service"
import { BadRequest } from "@tsed/exceptions"

export const ProductController = {
    create: async (req: CreateRequest, res: Response) => {
        const properties: IPropertyDto[] = req.body.properties.map(property => new PropertyDto({
            propertyId: property.propertyId,
            value: property.value,
            name: property.name
        }))

        const product = await ProductService.create(new CreateProductDto({
            name: req.body.name,
            categoryId: parseInt(req.body.categoryId),
            price: parseFloat(req.body.price),
            properties
        }))

        res.status(StatusCodes.OK).send({
            product
        })
    },

    update: async (req: UpdateRequest, res: Response) => {
        const properties: IPropertyDto[] = req.body.properties.map(property => new PropertyDto({
            propertyId: property.propertyId,
            value: property.value,
            name: property.name
        }))

        const product = await ProductService.update(new UpdateProductDto({
            name: req.body.name,
            price: parseFloat(req.body.price),
            categoryId: parseInt(req.body.categoryId),
            id: parseInt(req.params.id),
            properties
        }))

        res.status(StatusCodes.OK).send({
            product
        })
    },

    delete: async (req: IdRequest, res: Response) => {
        const productId = parseInt(req.params.id)

        await ProductService.delete(productId)

        res.status(StatusCodes.OK).send({
            message: "Product successfully deleted"
        })
    },

    get: async (req: IdRequest, res: Response) => {
        const productId = parseInt(req.params.id)
        const product = await ProductService.get(productId)

        res.status(StatusCodes.OK).send({
            product
        })
    },

    getAll: async (req: Request, res: Response) => {
        const products = await ProductService.getAll()

        res.status(StatusCodes.OK).send({
            products
        })
    }

}