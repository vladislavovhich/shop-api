import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../config/db'
import { User } from './user.model'

export class Role extends Model {
    declare id: number
    declare name: string
}

Role.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'role',
    timestamps: false,
})

User.belongsTo(Role, {
    foreignKey: 'roleId',
    as: 'role',
})

Role.hasMany(User, {
    foreignKey: 'roleId',
    as: 'users',
})