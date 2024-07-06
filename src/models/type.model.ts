import { Model, DataTypes } from 'sequelize'
import sequelize from "../config/db"

class Type extends Model {
    declare id: number
    declare name: string
}

Type.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'type',
    timestamps: false,
})

export default Type