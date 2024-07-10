import express, { Router } from 'express'
import { ProductController } from '../controllers/product.controller'
import { OrderController } from '../controllers/order.controller'
import { GetByIdSchema } from '../types/common.types'
import passport from 'passport'
import { CartController } from '../controllers/cart.controller'
import { ReviewController } from '../controllers/review.controller'
import { isValid } from '../middleware/validation.middleware'
import { CreateProductSchema } from '../types/product.types'
import { CreateReviewParamsSchema, ReviewIdReqSchema, ReviewReqSchema } from '../types/review.types'
import { MakeOrderSchema } from '../types/order.types'

const router: Router = express.Router()

// product routes

router.get("/:id", 
    isValid(GetByIdSchema, "params"),
    ProductController.get)

router.get("/", ProductController.getAll)

router.put("/:id", 
    passport.authenticate('jwt', { session: false }), 
    isValid(GetByIdSchema, "params"),
    isValid(CreateProductSchema, "body"),
    ProductController.update)

router.post("/", 
    passport.authenticate('jwt', { session: false }), 
    isValid(CreateProductSchema, "body"),
    ProductController.create)

router.delete("/:id", 
    passport.authenticate('jwt', { session: false }),
    isValid(GetByIdSchema, "params"),
    ProductController.delete)

// product reviews routes

router.post("/:productId/reviews", 
    passport.authenticate('jwt', { session: false }), 
    isValid(CreateReviewParamsSchema, "params"),
    isValid(ReviewReqSchema, "body"),
    ReviewController.writeReview)

router.put("/:productId/reviews/:reviewId", 
    passport.authenticate('jwt', { session: false }),
    isValid(ReviewIdReqSchema, "params"),
    isValid(ReviewReqSchema, "body"),
    ReviewController.updateReview)

router.delete("/:productId/reviews/:reviewId", 
    isValid(ReviewIdReqSchema, "params"),
    passport.authenticate('jwt', { session: false }), 
    ReviewController.deleteReview)

router.get("/:id/reviews",  
    isValid(GetByIdSchema, "params"),
    ReviewController.getProductReviews)

//product order routes

router.post("/:id/order", 
    passport.authenticate('jwt', { session: false }), 
    isValid(GetByIdSchema, "params"),
    isValid(MakeOrderSchema, "body"),
    OrderController.makeOrder)

router.post("/:id/cart-add", 
    passport.authenticate('jwt', { session: false }), 
    isValid(GetByIdSchema, "params"),
    CartController.addToCart)

router.delete("/:id/cart-remove", 
    passport.authenticate('jwt', { session: false }), 
    isValid(GetByIdSchema, "params"),
    CartController.removeFromCart)

export { router as ProductRouter }