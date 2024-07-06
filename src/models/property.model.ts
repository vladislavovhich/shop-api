import { Model, DataTypes } from 'sequelize'
import sequelize from "../config/db"
import Type from './type.model'

class Property extends Model {
    declare id: number
    declare name: string

    declare addType: (type: Type) => Promise<Type | null>
    declare setType: (type: Type) => Promise<Type | null>
}

Property.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'property',
    timestamps: false,
})

Type.hasOne(Property)
Property.belongsTo(Type)

export default Property