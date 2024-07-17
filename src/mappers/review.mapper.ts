import { CreateRequest, ReviewIdRequest, UpdateRequest } from "../types/review.types"
import { CreateReviewDto } from "../dto/review/review-create.dto"
import { UpdateReviewDto } from "../dto/review/review-update.dto"
import { ReviewEditDto } from "../dto/review/review-edit.dto"
import { User } from "../models/user.model"

export const ReviewDtoMapper = {
    mapCreateDto: (req: CreateRequest, user: User): CreateReviewDto => {
        const files = req.files as Express.Multer.File[]

        return new CreateReviewDto({
            rating: parseInt(req.body.rating),
            text: req.body.text,
            productId: parseInt(req.params.productId),
            userId: user.id,
            date: new Date(),
            images: files?.map(file => file.path)
        })
    },

    mapUpdateDto: (req: UpdateRequest, user: User): UpdateReviewDto => {
        const files = req.files as Express.Multer.File[]

        return new UpdateReviewDto({
            rating: parseInt(req.body.rating),
            text: req.body.text,
            reviewId: parseInt(req.params.reviewId),
            userId: user.id,
            images: files?.map(file => file.path)
        })
    },

    mapDeleteDto: (req: ReviewIdRequest) => {
        return new ReviewEditDto({
            reviewId: parseInt(req.params.reviewId),
            productId: parseInt(req.params.productId)
        })
    }
}