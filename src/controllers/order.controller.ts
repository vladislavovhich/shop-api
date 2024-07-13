import { Request, Response } from "express"
import { MakeOrderRequest } from "../types/order.types"
import { IdRequest } from "../types/common.types"
import { OrderService } from "../services/order.service"
import { OrderMakeDto } from "../dto/order/order-make.dto"
import { StatusCodes } from "http-status-codes"
import { UserService } from "../services/user.service"

export const OrderController = {
    makeOrder: async (req: MakeOrderRequest, res: Response) => {
        const user = await UserService.extractUserFromReq(req)

        const order = await OrderService.makeOrder(new OrderMakeDto({
            date: new Date(),
            amount: parseInt(req.body.amount),
            productId: parseInt(req.params.id),
            userId: user.id
        }))

        res.status(StatusCodes.OK).send({
            order
        })
    },

    userOrders: async (req: IdRequest, res: Response) => {
        const userId = parseInt(req.params.id)
        const orders = await OrderService.ordersByUser(userId)

        res.status(StatusCodes.OK).send({
            orders
        })
    },

    getMyOrders: async (req: Request, res: Response) => {
        const user = await UserService.extractUserFromReq(req)

        const orders = await OrderService.ordersByUser(user.id)

        res.status(StatusCodes.OK).send({
            orders
        })
    }
}