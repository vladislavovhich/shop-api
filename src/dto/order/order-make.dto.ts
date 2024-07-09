export interface IOrderMakeDto {
    date: Date
    amount: number
    productId: number
    userId: number
}

export class OrderMakeDto implements IOrderMakeDto {
    public date: Date
    public amount: number
    public productId: number
    public userId: number

    constructor(data: IOrderMakeDto) {
        this.date = data.date
        this.amount = data.amount
        this.productId = data.productId
        this.userId = data.userId
    }
}