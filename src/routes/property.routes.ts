import express, { Router } from 'express'
import PropertyController from '../controllers/property.controller'

const router: Router = express.Router()

router.get("/:id", PropertyController.get)

router.get("/", PropertyController.getAll)

router.put("/:id", PropertyController.update)

router.post("/", PropertyController.create)

router.delete("/:id", PropertyController.delete)

export default router