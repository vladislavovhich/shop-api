import express, { Router } from 'express'
import PropertyController from '../controllers/property.controller'

const router: Router = express.Router()

router.get("/:id", PropertyController.get)

router.get("/", PropertyController.getAll)

router.put("/update/:id", PropertyController.update)

router.post("/create", PropertyController.create)

router.delete("/delete/:id", PropertyController.delete)

export default router