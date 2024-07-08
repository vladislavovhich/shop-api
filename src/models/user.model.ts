import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../config/db'
import { Role } from './role.model'

export class User extends Model {
    declare id: number
    declare email: string
    declare password: string
    declare roleId: number
    declare token: string

    declare setRole: (role: Role | null) => Promise<void>
}

User.init(
  {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  },
  {
        sequelize,
        modelName: 'user',
        timestamps: false,
  }
)
