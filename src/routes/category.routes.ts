import express, { Router } from 'express'
import { CategoryController } from '../controllers/category.controller'

const router: Router = express.Router()

router.get("/:id", CategoryController.get)

router.get("/", CategoryController.getAll)

router.put("/:id", CategoryController.update)

router.post("", CategoryController.create)

router.delete("/:id", CategoryController.delete)

router.get("/:id/properties", CategoryController.getCategoryProperties)
  
router.put("/:categoryId/add-property/:propertyId", CategoryController.addProperty)
    
router.delete("/:categoryId/remove-property/:propertyId", CategoryController.removeProperty)

export { router as CategoryRouter }