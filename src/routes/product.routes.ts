import express, { Router } from 'express'
import { ProductController } from '../controllers/product.controller'

const router: Router = express.Router()

router.get("/:id", ProductController.get)

router.get("/", ProductController.getAll)

router.put("/:id", ProductController.update)

router.post("", ProductController.create)

router.delete("/:id", ProductController.delete)

export { router as ProductRouter }