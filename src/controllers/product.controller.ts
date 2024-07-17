import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { CreateRequest, GetAllRequest, UpdateRequest } from "../types/product.types"
import { ProductService } from "../services/product.service"
import { IdRequest } from "../types/common.types"
import { UserService } from "../services/user.service"
import { ProductDtoMapper } from "../mappers/product.mapper"

export const ProductController = {
    create: async (req: CreateRequest, res: Response) => {
        const user = await UserService.extractUserFromReq(req)
        const createProductDto = ProductDtoMapper.mapCreateDto(req, user)
        const product = await ProductService.create(createProductDto)

        res.status(StatusCodes.OK).send({
            product
        })
    },

    update: async (req: UpdateRequest, res: Response) => {
        const updateProductDto = ProductDtoMapper.mapUpdateDto(req)
        const product = await ProductService.update(updateProductDto)

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
        const getAllDto = ProductDtoMapper.mapGetAllDto(req)
        const result = await ProductService.getAll(getAllDto) 

        res.status(StatusCodes.OK).json(result)
    }    
}