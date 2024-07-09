import express, { Router } from 'express'
import { UserController } from '../controllers/user.controller'
import { OrderController } from '../controllers/order.controller'
import passport from 'passport'

const router: Router = express.Router()

router.put("/profile", passport.authenticate('jwt', { session: false }), UserController.updateProfile)
router.get("/profile", passport.authenticate('jwt', { session: false }), UserController.getMyProfile)
router.get("/orders", passport.authenticate('jwt', { session: false }), OrderController.getMyOrders)

router.get("/:id/orders", passport.authenticate('jwt', { session: false }), OrderController.userOrders)
router.get("/:id/profile", UserController.getProfile)

export { router as UserRouter }