export interface ICartOperationDto {
    userId: number
    productId: number
}

export class CartOperationDto implements ICartOperationDto {
    public userId: number
    public productId: number

    constructor(data: ICartOperationDto) {
        this.userId = data.userId
        this.productId = data.productId
    }
}
