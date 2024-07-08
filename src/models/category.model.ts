import { Model, DataTypes } from 'sequelize'
import { sequelize } from "../config/db"
import { Property } from './property.model'

class Category extends Model {
    declare id: number
    declare name: string

    declare addProperty: (property: Property) => Promise<Property | null>
    declare hasProperty: (property: Property) => Promise<boolean | null>
    declare removeProperty: (property: Property) => Promise<void>
    declare properties: Property[]
}

Category.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'category',
    timestamps: false,
})

Category.belongsToMany(Property, { through: 'category_properties'})
Property.belongsToMany(Category, { through: 'category_properties'})

export { Category }