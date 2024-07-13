import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../config/db'
import { Role } from './role.model'
import { Product } from './product.model'
import { Order } from './order.model'
import { Review } from './review.model'
import { Image } from './image.model'

class User extends Model {
    declare id: number
    declare email: string
    declare password: string
    declare roleId: number
    declare token: string
    declare name: string
    declare birthDate: Date

    declare setRole: (role: Role | null) => Promise<void>
    declare setCartProducts: (products: (Product | number)[]) => Promise<void>
    declare addCartProduct: (products: Product | number) => Promise<void>
    declare hasCartProduct: (product: Product | number) => Promise<boolean>
    declare hasOrder: (order: Order | number) => Promise<boolean>
    declare hasReview: (review: Review | number) => Promise<boolean>
    declare hasSellerProduct: (product: Product | number) => Promise<boolean>
    declare removeCartProduct: (product: Product | number) => Promise<void>
    declare getCartProducts: () => Promise<Product[]>
    declare addImage: (image: Image) => Promise<void>
    declare getImages: () => Promise<Image[]>
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
      },
      name: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      birthDate: {
          type: DataTypes.DATEONLY,
          allowNull: false,
      }
  },
  {
        sequelize,
        modelName: 'user',
        timestamps: false,
  }
)

export { User }