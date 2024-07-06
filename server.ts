import db from "./src/config/db"
import Product from "./src/models/product.model"
import Type from "./src/models/type.model"
import Property from "./src/models/property.model"
import Category from "./src/models/category.model"
import ProductProperty from "./src/models/product-property.model"
import app from "./app"
import "dotenv/config"

const PORT = process.env.PORT || 8080

db.sync({ force: false }).then(async () => {
    await Type.sync({force: false})
    await Property.sync({force: false})
    await Product.sync({force: false})
    await Category.sync({force: false})
    await ProductProperty.sync({force: false})

    let types: number = await Type.count()

    if (types == 0) {
        await Type.bulkCreate([
            {name: "number"},
            {name: "string"}
        ])
    }

    app.listen(PORT)
})