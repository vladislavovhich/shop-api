import { Request, Response } from "express"
import { IdRequest, MakeOrderRequest } from "../types/order.types"
import { OrderService } from "../services/order.service"
import { OrderMakeDto } from "../dto/order/order-make.dto"
import { StatusCodes } from "http-status-codes"
import { User } from "../models/user.model"
import { BadRequest } from "@tsed/exceptions"

export const OrderController = {
    makeOrder: async (req: MakeOrderRequest, res: Response) => {
        // #swagger.tags = ['Product']
        const user = (await req.user) as User

        if (!user) {
            throw new BadRequest("User not specified")
        }

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
        // #swagger.tags = ['User']

        const userId = parseInt(req.params.id)
        const orders = await OrderService.ordersByUser(userId)

        res.status(StatusCodes.OK).send({
            orders
        })
    },

    getMyOrders: async (req: Request, res: Response) => {
        // #swagger.tags = ['User']
        console.log(req.user)
        const user = await req.user

        if (!user) {
            throw new BadRequest("User not specified")
        }

        const orders = await OrderService.ordersByUser(user.id)

        res.status(StatusCodes.OK).send({
            orders
        })
    }
}