export interface IUpdateReviewDto {
    rating: number
    text: string
    reviewId: number
    userId: number
    images?: string[]
}

export class UpdateReviewDto implements IUpdateReviewDto {
    public rating: number
    public text: string
    public reviewId: number
    public userId: number
    public images?: string[] | undefined

    constructor(data: IUpdateReviewDto) {
        this.rating = data.rating
        this.text = data.text
        this.reviewId = data.reviewId
        this.userId = data.userId
        this.images = data.images
    }
}