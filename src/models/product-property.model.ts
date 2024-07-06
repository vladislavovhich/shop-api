import { Model, DataTypes } from 'sequelize'
import sequelize from "../config/db"
import Property from './property.model'
import Product from './products.model'

class ProductProperty extends Model {
    declare id: number
    declare value: string
}

ProductProperty.init({
    value: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'product-value',
    timestamps: false,
})

Property.hasOne(ProductProperty)
ProductProperty.belongsTo(Property)

Product.hasOne(ProductProperty)
ProductProperty.belongsTo(Product)


export default ProductProperty