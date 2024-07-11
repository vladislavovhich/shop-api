import express, { Router } from 'express'
import { PropertyController } from '../controllers/property.controller'
import { isValid } from '../middleware/validation.middleware'
import passport from 'passport'
import { GetByIdSchema } from '../types/common.types'
import { PropertySchema } from '../types/property.types'
import { isAdmin } from '../middleware/check-role.middleware'

const router: Router = express.Router()

router.get("/:id", 
    isValid(GetByIdSchema, "params"),
    PropertyController.get)

router.get("/", PropertyController.getAll)

router.put("/:id", 
    passport.authenticate('jwt', { session: false }),
    isAdmin(),
    isValid(GetByIdSchema, "params"),
    isValid(PropertySchema, "body"),
    PropertyController.update)

router.post("/", 
    passport.authenticate('jwt', { session: false }),
    isAdmin(),
    isValid(PropertySchema, "body"),
    PropertyController.create)

router.delete("/:id", 
    passport.authenticate('jwt', { session: false }),
    isAdmin(),
    isValid(GetByIdSchema, "params"),
    PropertyController.delete)

export { router as PropertyRouter }