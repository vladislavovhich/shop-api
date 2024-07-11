import express, { Router } from 'express'
import { CategoryController } from '../controllers/category.controller'
import { GetByIdSchema } from '../types/common.types'
import { CategoryReqSchema, CategoryPropertySchema } from '../types/category.types'
import { isValid } from '../middleware/validation.middleware'
import passport from 'passport'
import { isAllowed, isAdmin } from '../middleware/check-role.middleware'

const router: Router = express.Router()

router.get("/:id", 
    isValid(GetByIdSchema, "params"),
    CategoryController.get)

router.get("/", CategoryController.getAll)

router.put("/:id", 
    passport.authenticate('jwt', { session: false }),
    isAdmin(),
    isValid(GetByIdSchema, "params"),
    isValid(CategoryReqSchema, "body"),
    CategoryController.update)

router.post("/", 
    passport.authenticate('jwt', { session: false }),
    isAdmin(),
    isValid(CategoryReqSchema, "body"),
    CategoryController.create)

router.delete("/:id", 
    passport.authenticate('jwt', { session: false }),
    isAdmin(),
    isValid(GetByIdSchema, "params"),
    CategoryController.delete)

router.get("/:id/properties", 
    isValid(GetByIdSchema, "params"),
    CategoryController.getCategoryProperties)
  
router.post("/:categoryId/add-property/:propertyId",
    passport.authenticate('jwt', { session: false }),
    isAdmin(),
    isValid(CategoryPropertySchema, "params"), 
    CategoryController.addProperty)
    
router.delete("/:categoryId/remove-property/:propertyId",
    passport.authenticate('jwt', { session: false }),
    isAdmin(),
    isValid(CategoryPropertySchema, "params"),  
    CategoryController.removeProperty)

export { router as CategoryRouter }