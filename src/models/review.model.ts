import { Model, DataTypes } from 'sequelize'
import { sequelize } from "../config/db"
import { Type } from './type.model'
import { User } from './user.model'
import { Product } from './product.model'
import { IUserBelongsTo } from '../types/common.types'

class Review extends Model implements IUserBelongsTo{
    declare id: number
    declare date: Date
    declare text: string
    declare rating: number

    declare userId: number
    declare productId: number

    declare setType: (type: Type) => Promise<Type | null>
    declare setUser: (user: User) => Promise<void>
    declare setProduct: (product: Product) => Promise<void>
}

Review.init({
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'review',
    timestamps: false,
})

User.hasMany(Review)
Review.belongsTo(User)

Product.hasMany(Review)
Review.belongsTo(Product)

export { Review }