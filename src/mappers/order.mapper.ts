import { OrderMakeDto } from "../dto/order/order-make.dto"
import { User } from "../models/user.model"
import { MakeOrderRequest } from "../types/order.types"

export const OrderDtoMapper = {
    mapCreateDto: (req: MakeOrderRequest, user: User): OrderMakeDto => {
        return new OrderMakeDto({
            date: new Date(),
            amount: parseInt(req.body.amount),
            productId: parseInt(req.params.id),
            userId: user.id
        })
    }
}