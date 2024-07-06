import { Model, DataTypes } from 'sequelize'
import sequelize from "../config/db"
import Property from './property.model'

class Category extends Model {
    declare id: number
    declare name: string
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

Category.belongsToMany(Property, { through: 'category_property'})
Property.belongsToMany(Category, { through: 'category_property'})

export default Category