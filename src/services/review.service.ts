import { BadRequest } from "@tsed/exceptions";
import { CreateReviewDto } from "../dto/review/review-create.dto";
import { Review } from "../models/review.model";
import { ProductService } from "./product.service";
import { UserService } from "./user.service";
import { UpdateReviewDto } from "../dto/review/review-update.dto";
import { Product } from "../models/product.model";
import { IReviewEditDto } from "../dto/review/review-edit.dto";

export const ReviewService = {
    create: async (createReviewDto: CreateReviewDto): Promise<Review> => {
        const user = await UserService.findById(createReviewDto.userId)
        const product = await ProductService.get(createReviewDto.productId)

        const review = await Review.create({
            date: createReviewDto.date,
            text: createReviewDto.text,
            rating: createReviewDto.rating
        })

        await review.setUser(user)
        await review.setProduct(product)

        return review
    },

    belongsToUser: async (userId: number, reviewId: number): Promise<boolean> => {
        const user = await UserService.findById(userId)
        const review = await ReviewService.get(reviewId)
        const hasReview = await user.hasReview(review)

        return hasReview
    },

    update: async (updateReviewDto: UpdateReviewDto): Promise<Review> => {
        const review = await ReviewService.get(updateReviewDto.reviewId)

        await review.update({
            rating: updateReviewDto.rating,
            text: updateReviewDto.text
        })

        return review
    },

    delete: async (reviewEditDto: IReviewEditDto): Promise<void> => {
        const product = await ProductService.get(reviewEditDto.productId)
        const review = await ReviewService.get(reviewEditDto.reviewId)
        const hasReview = await product.hasReview(review)

        if (!hasReview) {
            throw new BadRequest("Review doesn't belong to product")
        }

        await review.destroy()
    },

    get: async (id: number): Promise<Review> => {
        const review = await Review.findByPk(id)

        if (!review) {
            throw new BadRequest("Review not found")
        }

        return review
    },

    getProductReviews: async (productId: number): Promise<Review[]> => {
        const product = await ProductService.get(productId)
        const reviews = await product.getReviews()

        return reviews
    }
}