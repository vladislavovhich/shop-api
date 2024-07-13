import { Model, DataTypes } from 'sequelize'
import { sequelize } from "../config/db"
import { Category } from './category.model'
import { ProductProperty } from './product-property.model'
import { User } from './user.model'
import { Review } from './review.model'
import { IUserBelongsTo } from '../types/common.types'
import { Image } from './image.model'

class Product extends Model implements IUserBelongsTo {
    declare id: number
    declare name: string
    declare price: number
    declare userId: number

    declare setUser: (user: User | number) => Promise<void>
    declare setCategory: (category: Category) => Promise<Category | null>
    declare getProductProperties: () => Promise<ProductProperty[]>
    declare getReviews: () => Promise<Review[]>
    declare hasReview: (review: Review) => Promise<boolean>
    declare addImage: (image: Image) => Promise<void>
    declare getImages: () => Promise<Image[]>
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

Category.hasOne(Product)
Product.belongsTo(Category)

Product.belongsToMany(User, { through: 'carts', as: "cartUsers"})
User.belongsToMany(Product, { through: 'carts', as: "cartProducts"})

User.hasMany(Product, { as: 'SellerProducts' })
Product.belongsTo(User)

Product.hasMany(Image, {
    foreignKey: 'itemId',
    constraints: false,
    scope: {
        itemType: 'product',
    },
})
Image.belongsTo(Product, { foreignKey: 'itemId', constraints: false });

Product.hasMany(Review)
Review.belongsTo(Product)

export { Product }