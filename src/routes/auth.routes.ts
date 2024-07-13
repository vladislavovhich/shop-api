import express, { Router } from 'express'
import { AuthController } from "../controllers/auth.controller";
import passport from 'passport'
import { isValid } from '../middleware/validation.middleware';
import { LoginUserSchema, CreateUserSchema } from '../types/user.types';
import { upload } from '../config/multer';

const router: Router = express.Router()

router.post("/register", 
    upload.single('image'),
    isValid(CreateUserSchema, "body"),
    AuthController.register)

router.post("/login", 
    isValid(LoginUserSchema, "body"),
    AuthController.login)

router.put("/logout", 
    passport.authenticate('jwt', { session: false }), 
    AuthController.logout)

router.put("/refresh-token", 
    passport.authenticate('jwt', { session: false }), 
    AuthController.refreshToken)

export {router as AuthRouter}
