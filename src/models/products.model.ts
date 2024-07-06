import { Model, DataTypes } from 'sequelize'
import sequelize from "../config/db"

class Product extends Model {
    declare id: number
    declare name: string
    declare price: number
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

export default Product