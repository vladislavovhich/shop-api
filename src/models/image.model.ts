import { Model, DataTypes } from 'sequelize'
import { sequelize } from "../config/db"
import { User } from './user.model'
import { Product } from './product.model'
import { Review } from './review.model'

class Image extends Model {
    declare id: number
    declare url: string
    declare itemId: number
    declare itemType: 'user' | 'product' | 'review' | null

    declare setUser: (user: User) => Promise<void>
}

Image.init({
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    itemId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    itemType: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'image',
    timestamps: false,
})

User.hasMany(Image, {
    foreignKey: 'itemId',
    constraints: false,
    scope: {
        itemType: 'user',
    },
})
Image.belongsTo(User, { foreignKey: 'itemId', constraints: false })

Image.addHook('beforeFind', (options) => {
    if (options.where && (options.where as any).itemType) {
        const where = options.where as any

        if (where.itemType === 'user') {
            options.include = [{ model: User }]
        } else if (where.itemType === 'product') {
            options.include = [{ model: Product }]
        } else if (where.itemType === 'review') {
            options.include = [{ model: Review }]
        }
    }
})

export { Image }
