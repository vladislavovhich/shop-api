import { Model, DataTypes } from 'sequelize'
import { sequelize } from "../config/db"
import { Product } from './product.model'
import { User } from './user.model'

class Order extends Model {
    declare id: number
    declare amount: number
    declare date: Date
    declare productId: number
    declare userId: number

    declare setUser: (user: User) => Promise<void>
    declare setProduct: (product: Product) => Promise<void>
}

Order.init({
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'order',
    timestamps: false,
})

User.hasMany(Order, { onDelete: 'CASCADE' })
Order.belongsTo(User)

Product.hasMany(Order, { onDelete: 'CASCADE' })
Order.belongsTo(Product)

export { Order }