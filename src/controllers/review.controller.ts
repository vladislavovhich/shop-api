import { Request, Response } from "express"
import { CreateRequest, UpdateRequest, ReviewIdRequest } from "../types/review.types"
import { UserService } from "../services/user.service"
import { ReviewService } from "../services/review.service"
import { CreateReviewDto } from "../dto/review/review-create.dto"
import { StatusCodes } from "http-status-codes"
import { UpdateReviewDto } from "../dto/review/review-update.dto"
import { ProductService } from "../services/product.service"
import { ReviewEditDto } from "../dto/review/review-edit.dto"
import { IdRequest } from "../types/common.types"

export const ReviewController = {
    writeReview: async (req: CreateRequest, res: Response) => {
        // #swagger.tags = ['Product']

        const user = await UserService.extractUserFromReq(req)

        const review = await ReviewService.create(new CreateReviewDto({
            rating: parseInt(req.body.rating),
            text: req.body.text,
            productId: parseInt(req.params.productId),
            userId: user.id,
            date: new Date()
        }))

        res.status(StatusCodes.OK).send({
            review
        })
    },

    updateReview: async (req: UpdateRequest, res: Response) => {
        // #swagger.tags = ['Product']

        const user = await UserService.extractUserFromReq(req)

        const review = await ReviewService.update(new UpdateReviewDto({
            rating: parseInt(req.body.rating),
            text: req.body.text,
            reviewId: parseInt(req.params.reviewId),
            userId: user.id,
        }))

        res.status(StatusCodes.OK).send({
            review
        })
    },

    deleteReview: async (req: ReviewIdRequest, res: Response) => {
        // #swagger.tags = ['Product']

        await ReviewService.delete(new ReviewEditDto({
            reviewId: parseInt(req.params.reviewId),
            productId: parseInt(req.params.productId)
        }))

        res.sendStatus(StatusCodes.OK)
    },

    getProductReviews: async (req: IdRequest, res: Response) => {
        // #swagger.tags = ['Product']

        const reviews = await ReviewService.getProductReviews(parseInt(req.params.id))

        res.status(StatusCodes.OK).send({reviews})
    }
}