import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { CreateRequest, GetAllRequest, UpdateRequest } from "../types/product.types"
import { ProductService } from "../services/product.service"
import { CreateProductDto, IPropertyDto, PropertyDto } from "../dto/product/product-create.dto"
import { UpdateProductDto } from "../dto/product/product-update.dto"
import { IdRequest } from "../types/common.types"
import { UserService } from "../services/user.service"
import { Fields, ProductGetDto } from "../dto/product/product-get.dto"

export const ProductController = {
    create: async (req: CreateRequest, res: Response) => {
        const user = await UserService.extractUserFromReq(req)
        const file = req.file

        const properties: IPropertyDto[] = req.body.properties.map(property => new PropertyDto({
            propertyId: property.propertyId,
            value: property.value,
            name: property.name
        }))

        const product = await ProductService.create(new CreateProductDto({
            name: req.body.name,
            categoryId: parseInt(req.body.categoryId),
            price: parseFloat(req.body.price),
            properties,
            userId: user.id,
            productCover: file?.path
        }))

        res.status(StatusCodes.OK).send({
            product
        })
    },

    update: async (req: UpdateRequest, res: Response) => {
        const file = req.file
        
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
            properties,
            productCover: file?.path
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

    getAll: async (req: GetAllRequest, res: Response) => {
        let sortFields: Fields = [
            ["name", req.query.nameSort], 
            ["price", req.query.priceSort], 
            ["rating", req.query.ratingSort]
        ]

        let filterFields: Fields = [
            ["name", req.query.nameFilter], 
        ]

        sortFields = sortFields.filter(field => field[1]) as Fields
        filterFields = filterFields.filter(field => field[1]) as Fields

        let pageSize = 10, page = 1

        if (req.query.pageSize && !Number.isNaN(+req.query.pageSize)) {
            pageSize = +req.query.pageSize
        }

        if (req.query.page && !Number.isNaN(+req.query.page)) {
            page = +req.query.page
        }

        const result = await ProductService.getAll(new ProductGetDto({
            sortFields, filterFields, pageSize, page, offset: 0
        })) 

        res.status(StatusCodes.OK).json(result)
    }    
}