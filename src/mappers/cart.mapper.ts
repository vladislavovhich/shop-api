import { CartOperationDto } from "../dto/cart/cart-operation.dto"
import { User } from "../models/user.model"
import { IdRequest } from "../types/common.types"

export const CartDtoMapper = {
    mapOperationDto: (req: IdRequest, user: User): CartOperationDto => {
        const userId = user.id
        const productId = parseInt(req.params.id)

        return new CartOperationDto({
            userId, productId
        })
    }
}