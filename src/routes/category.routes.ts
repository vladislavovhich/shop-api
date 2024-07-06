import express, { Router } from 'express'
import CategoriesController from '../controllers/category.controller'

const router: Router = express.Router()

router.get("/:id", CategoriesController.get)

router.get("/", CategoriesController.getAll)

router.put("/update/:id", CategoriesController.update)

router.post("/create", CategoriesController.create)

router.delete("/delete/:id", CategoriesController.delete)

router.post("/:categoryId/property/:propertyId/add", CategoriesController.addProperty)
    
router.post("/:categoryId/property/:propertyId/remove", CategoriesController.removeProperty)

export default router