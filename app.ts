import express, { Application } from 'express'
import bodyParser from 'body-parser'
import cookieParser from "cookie-parser"
import cors from "cors"
import "dotenv/config"

const PORT = process.env.NODE_DOCKER_PORT || 8080

const app: Application = express()

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(PORT)
