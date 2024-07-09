const generateSwagger = require("swagger-autogen")();
require('dotenv').config()
   
const swaggerDocument = {
    info: {
        title: 'Shop API',
        version: '1.0.0',
        description: 'Shop API Information',
    },
    host: `${process.env.HOST_NAME}:${process.env.PORT}`,
    basePath: "/",
    schemes: ["https", "http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [
        {
            name: "User",
            description: "Endpoint"
        },
        {
            name: "Product",
            description: "Endpoint"
        },
        {
            name: "Property",
            description: "Endpoint"
        },
        {
            name: "Category",
            description: "Endpoint"
        },
        {
            name: "Order",
            description: "Endpoint"
        },
    ],
    definitions: {
    }
}

const swaggerFile = "../docs/swagger.json";
const apiRouteFile = ["./app.ts"]

generateSwagger(swaggerFile, apiRouteFile, swaggerDocument)