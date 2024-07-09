export interface IReviewEditDto {
    reviewId: number
    productId: number
}

export class ReviewEditDto implements IReviewEditDto {
    public reviewId: number
    public productId: number

    constructor(data: IReviewEditDto) {
        this.reviewId = data.reviewId
        this.productId = data.productId
    }
}