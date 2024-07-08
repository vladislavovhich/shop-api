import "express-async-errors"
import "dotenv/config"
import express, { Application } from 'express'
import bodyParser from 'body-parser'
import cookieParser from "cookie-parser"
import cors from "cors"
import { jwtStrategy } from "./src/config/passport"
import passport from "passport"
import { PropertyRouter } from "./src/routes/property.routes"
import { CategoryRouter } from "./src/routes/category.routes"
import { ProductRouter } from "./src/routes/product.routes"
import { exceptionHandler } from "./src/middleware/exception-handler"
import { AuthRouter } from "./src/routes/auth.routes"

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
app.use("/api/auth", AuthRouter)
app.use(exceptionHandler)   
