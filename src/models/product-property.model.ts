import { Model, DataTypes } from 'sequelize'
import { sequelize } from "../config/db"
import { Property } from './property.model'
import { Product } from './product.model'

class ProductProperty extends Model {
    declare id: number
    declare value: string
    declare productId: number
    declare propertyId: number

    declare setProduct: (product: Product) => Promise<void>
    declare setProperty: (property: Property) => Promise<void>
}

ProductProperty.init({
    value: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'productProperty',
    tableName: 'product_properties',
    timestamps: false,
})

Property.hasMany(ProductProperty, { onDelete: 'CASCADE' })
ProductProperty.belongsTo(Property)

Product.hasMany(ProductProperty, { onDelete: 'CASCADE' })
ProductProperty.belongsTo(Product)

export { ProductProperty }