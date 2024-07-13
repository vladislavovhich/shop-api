import "express-async-errors"
import "dotenv/config"
import express, { Application } from 'express'
import bodyParser from 'body-parser'
import cookieParser from "cookie-parser"
import cors from "cors"
import { jwtStrategy } from "../config/passport"
import passport from "passport"
import { PropertyRouter } from "../routes/property.routes"
import { CategoryRouter } from "../routes/category.routes"
import { ProductRouter } from "../routes/product.routes"
import { exceptionHandler } from "../middleware/exception-handler.middleware"
import { UserRouter } from "../routes/user.routes"
import { AuthRouter } from "../routes/auth.routes"
import { Request, Response } from "express"

export const app: Application = express()

passport.use(jwtStrategy)

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(passport.initialize())

app.use("/api/properties", PropertyRouter)
app.use("/api/categories", CategoryRouter)
app.use("/api/products", ProductRouter)
app.use("/api/users", UserRouter)
app.use("/api/auth", AuthRouter)
app.use(exceptionHandler)   
