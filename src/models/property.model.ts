import { Model, DataTypes } from 'sequelize'
import { sequelize } from "../config/db"
import { Type } from './type.model'

class Property extends Model {
    declare id: number
    declare name: string

    declare typeId: number
    declare type: Type
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

export { Property }