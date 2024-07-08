import { sequelize } from "./src/config/db"
import { Product } from "./src/models/product.model"
import { Type } from "./src/models/type.model"
import { Property } from "./src/models/property.model"
import { Category } from "./src/models/category.model"
import { ProductProperty } from "./src/models/product-property.model"
import { Role } from "./src/models/role.model"
import { User } from "./src/models/user.model"
import { app } from "./app"
import "dotenv/config"

const PORT = process.env.PORT || 8080

sequelize.sync({ force: false }).then(async () => {
    await Type.sync({force: false})
    await Property.sync({force: false})
    await Product.sync({force: false})
    await Category.sync({force: false})
    await ProductProperty.sync({force: false})
    await Role.sync({force: false})
    await User.sync({force: false})

    const types: number = await Type.count()

    if (types == 0) {
        await Type.bulkCreate([
            {name: "number"},
            {name: "string"}
        ])
    }

    const roles: number = await Role.count()

    if (roles == 0) {
        await Role.bulkCreate([
            {name: "customer"},
            {name: "seller"},
            {name: "admin"}
        ])
    }

    app.listen(PORT)
})