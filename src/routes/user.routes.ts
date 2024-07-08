import express, { Router } from 'express'
import { UserController } from '../controllers/user.controller'
import passport from 'passport'

const router: Router = express.Router()

router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.put("/logout", passport.authenticate('jwt', { session: false }), UserController.logout)
router.put("/refresh-token", passport.authenticate('jwt', { session: false }), UserController.refreshToken)
router.put("/profile/:id", passport.authenticate('jwt', { session: false }), UserController.updateProfile)
router.delete("/profile/:id", passport.authenticate('jwt', { session: false }), UserController.deleteAccount)

export { router as UserRouter }