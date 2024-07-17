import { Request, Response } from "express"
import { IdRequest } from "../types/common.types"
import { UserService } from "../services/user.service"
import { CartService } from "../services/cart.service"
import { CartOperationDto } from "../dto/cart/cart-operation.dto"
import { StatusCodes } from "http-status-codes"
import { CartDtoMapper } from "../mappers/cart.mapper"

export const CartController = {
    addToCart: async (req: IdRequest, res: Response) => {
        const user = await UserService.extractUserFromReq(req)
        const addProductDto = CartDtoMapper.mapOperationDto(req, user)
        const result = await CartService.addProductToCart(addProductDto)

        res.status(StatusCodes.OK).send({
            result
        })
    },

    removeFromCart: async (req: IdRequest, res: Response) => {
        const user = await UserService.extractUserFromReq(req)
        const cartOperationDto = CartDtoMapper.mapOperationDto(req, user)
        const result = await CartService.removeProductFromCart(cartOperationDto)

        res.status(StatusCodes.OK).send({
            result
        })
    },

    getUserCart: async (req: IdRequest, res: Response) => {
        const userId = parseInt(req.params.id)
        const userCart = await CartService.getUserProducts(userId)

        res.status(StatusCodes.OK).send({
            userCart
        })
    },

    getMyCart: async (req: Request, res: Response) => {
        const user = await UserService.extractUserFromReq(req)
        const cartProducts = await CartService.getUserProducts(user.id)

        res.status(StatusCodes.OK).send({
            cartProducts
        })
    }
}