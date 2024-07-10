import express, { Router } from 'express'
import { UserController } from '../controllers/user.controller'
import { OrderController } from '../controllers/order.controller'
import passport from 'passport'
import { CartController } from '../controllers/cart.controller'
import { isValid } from '../middleware/validation.middleware'
import { UpdateUserProfileSchema } from '../types/user.types'
import { GetByIdSchema } from '../types/common.types'

const router: Router = express.Router()

router.put("/profile", 
    passport.authenticate('jwt', { session: false }), 
    isValid(UpdateUserProfileSchema, "body"),
    UserController.updateProfile)

router.get("/profile", 
    passport.authenticate('jwt', { session: false }), 
    UserController.getMyProfile)

router.get("/orders", 
    passport.authenticate('jwt', { session: false }), 
    OrderController.getMyOrders)

router.get("/cart", 
    passport.authenticate('jwt', { session: false }), 
    CartController.getMyCart)

router.get("/:id/cart", 
    isValid(GetByIdSchema, "params"),
    CartController.getUserCart)

router.get("/:id/orders", 
    isValid(GetByIdSchema, "params"),
    OrderController.userOrders)

router.get("/:id/profile", 
    isValid(GetByIdSchema, "params"),
    UserController.getProfile)

export { router as UserRouter }