import express, { Router } from 'express'
import { ProductController } from '../controllers/product.controller'
import { OrderController } from '../controllers/order.controller'
import passport from 'passport'

const router: Router = express.Router()

router.get("/:id", ProductController.get)

router.get("/", ProductController.getAll)

router.put("/:id", passport.authenticate('jwt', { session: false }), ProductController.update)

router.post("/", passport.authenticate('jwt', { session: false }), ProductController.create)

router.delete("/:id", passport.authenticate('jwt', { session: false }), ProductController.delete)

router.post("/:id/order", passport.authenticate('jwt', { session: false }), OrderController.makeOrder)


export { router as ProductRouter }