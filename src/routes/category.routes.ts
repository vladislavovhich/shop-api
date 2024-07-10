import express, { Router } from 'express'
import { CategoryController } from '../controllers/category.controller'
import { GetByIdSchema } from '../types/common.types'
import { CategoryReqSchema, CategoryPropertySchema } from '../types/category.types'
import { isValid } from '../middleware/validation.middleware'

const router: Router = express.Router()

router.get("/:id", 
    isValid(GetByIdSchema, "params"),
    CategoryController.get)

router.get("/", CategoryController.getAll)

router.put("/:id", 
    isValid(GetByIdSchema, "params"),
    isValid(CategoryReqSchema, "body"),
    CategoryController.update)

router.post("/", 
    isValid(CategoryReqSchema, "body"),
    CategoryController.create)

router.delete("/:id", 
    isValid(GetByIdSchema, "params"),
    CategoryController.delete)

router.get("/:id/properties", 
    isValid(GetByIdSchema, "params"),
    CategoryController.getCategoryProperties)
  
router.put("/:categoryId/add-property/:propertyId",
    isValid(CategoryPropertySchema, "params"), 
    CategoryController.addProperty)
    
router.delete("/:categoryId/remove-property/:propertyId",
    isValid(CategoryPropertySchema, "params"),  
    CategoryController.removeProperty)

export { router as CategoryRouter }