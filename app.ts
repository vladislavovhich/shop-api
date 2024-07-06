import express, { Application } from 'express'
import bodyParser from 'body-parser'
import cookieParser from "cookie-parser"
import cors from "cors"
import PropertyRouter from "./src/routes/property.routes"
import CategoryRouter from "./src/routes/category.routes"
import "dotenv/config"

const app: Application = express()

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/api/properties", PropertyRouter)
app.use("/api/categories", CategoryRouter)

export default app
