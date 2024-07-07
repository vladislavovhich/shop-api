import { Model, DataTypes } from 'sequelize'
import sequelize from "../config/db"
import Category from './category.model'

class Product extends Model {
    declare id: number
    declare name: string
    declare price: number

    declare setCategory: (category: Category) => Promise<Category | null>
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

export default Product