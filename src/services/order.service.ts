import { OrderMakeDto } from "../dto/order/order-make.dto";
import { ProductService } from "./product.service";
import { Order } from "../models/order.model";
import { Product } from "../models/product.model";
import { User } from "../models/user.model";
import { UserService } from "./user.service";

export const OrderService = {
    makeOrder: async (orderMakeDto: OrderMakeDto): Promise<Order> => {
        const user = await UserService.findById(orderMakeDto.userId)
        const product = await ProductService.get(orderMakeDto.productId)

        const order = await Order.create({
            amount: orderMakeDto.amount,
            date: orderMakeDto.date
        })

        await order.setProduct(product)
        await order.setUser(user)
        await order.reload({include: [User, Product]})

        return order
    },

    ordersByUser: async (id: number): Promise<Order[]> => {
        const orders = await Order.findAll({
            where: {userId: id}
        })

        return orders
    }
}