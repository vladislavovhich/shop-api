import express, { Router } from 'express'
import { UserController } from '../controllers/user.controller'
import { OrderController } from '../controllers/order.controller'
import passport from 'passport'
import { CartController } from '../controllers/cart.controller'

const router: Router = express.Router()

router.put("/profile", passport.authenticate('jwt', { session: false }), UserController.updateProfile)
router.get("/profile", passport.authenticate('jwt', { session: false }), UserController.getMyProfile)
router.get("/orders", passport.authenticate('jwt', { session: false }), OrderController.getMyOrders)
router.get("/cart", passport.authenticate('jwt', { session: false }), CartController.getMyCart)

router.get("/:id/cart", CartController.getUserCart)
router.get("/:id/orders", OrderController.userOrders)
router.get("/:id/profile", UserController.getProfile)

export { router as UserRouter }