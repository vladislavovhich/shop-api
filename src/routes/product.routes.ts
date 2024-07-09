import express, { Router } from 'express'
import { ProductController } from '../controllers/product.controller'
import { OrderController } from '../controllers/order.controller'
import passport from 'passport'
import { CartController } from '../controllers/cart.controller'
import { ReviewController } from '../controllers/review.controller'

const router: Router = express.Router()

router.get("/:id", ProductController.get)
router.get("/", ProductController.getAll)
router.put("/:id", passport.authenticate('jwt', { session: false }), ProductController.update)
router.post("/", passport.authenticate('jwt', { session: false }), ProductController.create)
router.delete("/:id", passport.authenticate('jwt', { session: false }), ProductController.delete)
router.post("/:id/order", passport.authenticate('jwt', { session: false }), OrderController.makeOrder)
router.post("/:id/cart-add", passport.authenticate('jwt', { session: false }), CartController.addToCart)
router.delete("/:id/cart-remove", passport.authenticate('jwt', { session: false }), CartController.removeFromCart)
router.post("/:productId/reviews", passport.authenticate('jwt', { session: false }), ReviewController.writeReview)
router.put("/:productId/reviews/:reviewId", passport.authenticate('jwt', { session: false }), ReviewController.updateReview)
router.delete("/:productId/reviews/:reviewId", passport.authenticate('jwt', { session: false }), ReviewController.deleteReview)
router.get("/:id/reviews", passport.authenticate('jwt', { session: false }), ReviewController.getProductReviews)

export { router as ProductRouter }