import { Request, Response } from "express"
import { IdRequest } from "../types/common.types"
import { UserService } from "../services/user.service"
import { CartService } from "../services/cart.service"
import { CartOperationDto } from "../dto/cart/cart-operation.dto"
import { StatusCodes } from "http-status-codes"

export const CartController = {
    addToCart: async (req: IdRequest, res: Response) => {
        let user = await UserService.extractUserFromReq(req)

        const userId = user.id
        const productId = parseInt(req.params.id)

        user = await CartService.addProductToCart(new CartOperationDto({
            userId, productId
        }))

        res.status(StatusCodes.OK).send({
            user
        })
    },

    removeFromCart: async (req: IdRequest, res: Response) => {
        let user = await UserService.extractUserFromReq(req)

        const userId = user.id
        const productId = parseInt(req.params.id)

        user = await CartService.removeProductFromCart(new CartOperationDto({
            userId, productId
        }))

        res.status(StatusCodes.OK).send({
            user
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