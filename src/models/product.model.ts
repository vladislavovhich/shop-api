import { Model, DataTypes } from 'sequelize'
import { sequelize } from "../config/db"
import { Category } from './category.model'
import { ProductProperty } from './product-property.model'
import { User } from './user.model'
import { Review } from './review.model'

class Product extends Model {
    declare id: number
    declare name: string
    declare price: number

    declare setCategory: (category: Category) => Promise<Category | null>
    declare getProductProperties: () => Promise<ProductProperty[]>
    declare getReviews: () => Promise<Review[]>
    declare hasReview: (review: Review) => Promise<boolean>
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

export { Product }