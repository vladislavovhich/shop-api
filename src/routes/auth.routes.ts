import express, { Router } from 'express'
import { AuthController } from "../controllers/auth.controller";
import passport from 'passport'

const router: Router = express.Router()

router.post("/register", AuthController.register)
router.post("/login", AuthController.login)
router.put("/logout", passport.authenticate('jwt', { session: false }), AuthController.logout)
router.put("/refresh-token", passport.authenticate('jwt', { session: false }), AuthController.refreshToken)

export {router as AuthRouter}
