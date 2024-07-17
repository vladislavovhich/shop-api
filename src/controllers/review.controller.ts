import { Request, Response } from "express"
import { CreateRequest, UpdateRequest, ReviewIdRequest } from "../types/review.types"
import { UserService } from "../services/user.service"
import { ReviewService } from "../services/review.service"
import { StatusCodes } from "http-status-codes"
import { IdRequest } from "../types/common.types"
import { ReviewDtoMapper } from "../mappers/review.mapper"

export const ReviewController = {
    writeReview: async (req: CreateRequest, res: Response) => {
        const user = await UserService.extractUserFromReq(req)
        const createReviewDto = ReviewDtoMapper.mapCreateDto(req, user)
        const review = await ReviewService.create(createReviewDto)

        res.status(StatusCodes.OK).send({
            review
        })
    },

    updateReview: async (req: UpdateRequest, res: Response) => {
        const user = await UserService.extractUserFromReq(req)
        const updateReviewDto = ReviewDtoMapper.mapUpdateDto(req, user)
        const review = await ReviewService.update(updateReviewDto)

        res.status(StatusCodes.OK).send({
            review
        })
    },

    deleteReview: async (req: ReviewIdRequest, res: Response) => {
        const deleteReviewDto = ReviewDtoMapper.mapDeleteDto(req)

        await ReviewService.delete(deleteReviewDto)

        res.sendStatus(StatusCodes.OK)
    },

    getProductReviews: async (req: IdRequest, res: Response) => {
        const reviews = await ReviewService.getProductReviews(parseInt(req.params.id))

        res.status(StatusCodes.OK).send({reviews})
    }
}