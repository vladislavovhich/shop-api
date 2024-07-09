import { Model, DataTypes } from 'sequelize'
import { sequelize } from "../config/db"
import { Category } from './category.model'
import { ProductProperty } from './product-property.model'
import { User } from './user.model'

class Product extends Model {
    declare id: number
    declare name: string
    declare price: number

    declare setCategory: (category: Category) => Promise<Category | null>
    declare getProductProperties: () => Promise<ProductProperty[]>
}

Product.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'product',
    timestamps: false,
})

Category.hasOne(Product)
Product.belongsTo(Category)

Product.belongsToMany(User, { through: 'carts'})
User.belongsToMany(Product, { through: 'carts'})

export { Product }