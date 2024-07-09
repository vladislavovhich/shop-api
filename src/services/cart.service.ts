
import { ProductService } from "./product.service";
import { Product } from "../models/product.model";
import { User } from "../models/user.model";
import { UserService } from "./user.service";
import { CartOperationDto } from "../dto/cart/cart-operation.dto";
import { BadRequest } from "@tsed/exceptions";
import { Property } from "../models/property.model";
import { ProductProperty } from "../models/product-property.model";

export const CartService = {
    addProductToCart: async (cartOperationDto: CartOperationDto): Promise<User> => {
        const user = await UserService.findById(cartOperationDto.userId)
        const product = await ProductService.get(cartOperationDto.productId)

        const hasProduct = await user.hasCartProduct(product)

        if (hasProduct) {
            throw new BadRequest(`You've already added product '${product.name}' to your cart`)
        }

        await user.addCartProduct(product)
        await user.reload({
            include: [
                { 
                    model: Product, 
                    as: 'cartProducts', 
                    include: [
                        {model: ProductProperty, include: [Property]}
                    ]
                }
            ]
        })

        return user
    },

    removeProductFromCart: async (cartOperationDto: CartOperationDto): Promise<User> => {
        const user = await UserService.findById(cartOperationDto.userId)
        const product = await ProductService.get(cartOperationDto.productId)
        const hasProduct = await user.hasCartProduct(product)

        if (!hasProduct) {
            throw new BadRequest(`You can't remove product '${product.name}' because it isn't in the cart`)
        }

        await user.removeCartProduct(product)
        
        return user
    },

    getUserProducts: async (userId: number): Promise<User> => {
        const user = await UserService.findById(userId)

        await user.reload({
            include: [
                { 
                    model: Product, 
                    as: 'cartProducts', 
                    include: [
                        {model: ProductProperty, include: [Property]}
                    ]
                }
            ]
        })

        return user
    }
}