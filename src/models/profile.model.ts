import { Model, DataTypes } from 'sequelize'
import { sequelize } from "../config/db"
import { User } from './user.model'

class Profile extends Model {
    declare id: number
    declare name: string
    declare birthDate: Date
    declare userId: number
     
    declare setUser: (user: User) => Promise<void>
}

Profile.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'profile',
    timestamps: false,
})

User.hasMany(Profile)
Profile.belongsTo(User)  

export { Profile }