import { BadRequest, NotFound } from "@tsed/exceptions";
import { CreateProductDto, IPropertyDto } from "../dto/product/product-create.dto";
import { Product } from "../models/product.model";
import { CategoryService } from "./category.service";
import { Category } from "../models/category.model";
import { UpdateProductDto } from "../dto/product/product-update.dto";
import { ProductProperty } from "../models/product-property.model";
import { Property } from "../models/property.model";
import { UserService } from "./user.service";
import { IProductGetDto } from "../dto/product/product-get.dto";
import { Image } from "../models/image.model";
import { ImageService } from "./image.service";
import { IGetAllResult } from "../types/product.types";
import { Op, fn, col, Sequelize } from "sequelize";
import { Review } from "../models/review.model";
import { sequelize } from "../config/db";

export const ProductService = {
    checkProperties: (category: Category, propertiesReceived: IPropertyDto[]) => {
        const properties = category.properties
        const isValid = properties.every(property => propertiesReceived.some(prop => prop.propertyId == property.id))

        if (!isValid) {
            throw new BadRequest(
                `Product of category '${category.name}' must contain these properties: ${properties.map(prop => prop.name).join(", ")}` +
                 `, but recevied only these ones: ${propertiesReceived.map(prop => prop.name).join(", ")}`)
        }

        for (let propertyReceived of propertiesReceived) {
            let property = properties.find(prop => propertyReceived.propertyId == prop.id) as Property

            switch (property?.type.name) {
                case "number": 
                    if (Number.isNaN(+propertyReceived.value)) {
                        throw new BadRequest(`Property '${propertyReceived.name}' must have '${property.type.name}' type`)
                    }
                break
                case "string": 
                    if (!propertyReceived.value.trim()) {
                        throw new BadRequest(`Property '${propertyReceived.name}' must have '${property.type.name}' type`)
                    }
                break
            }
        }
    },

    create: async (createProductDto: CreateProductDto): Promise<Product> => {
        const category = await CategoryService.getCategoryProperties(createProductDto.categoryId)
        const user = await UserService.findById(createProductDto.userId)
        const propertiesReceived = createProductDto.properties

        ProductService.checkProperties(category, propertiesReceived)

        const product = await Product.create({
            name: createProductDto.name,
            price: createProductDto.price
        })

        await product.setCategory(category)

        for (let property of propertiesReceived) {
            await ProductProperty.create({
                value: property.value,
                productId: product.id,
                propertyId: property.propertyId
            })
        }

        if (createProductDto.productCover) {
            const image = await ImageService.upload(createProductDto.productCover)

            await product.addImage(image)
        }

        await product.setUser(user)
        await product.reload({include: [Category, Image, {model: ProductProperty, include: [Property]}]})

        return product
    },

    update: async (updateProductDto: UpdateProductDto): Promise<Product | null> => {
        const category = await CategoryService.getCategoryProperties(updateProductDto.categoryId)
        const propertiesReceived = updateProductDto.properties
        const product = await ProductService.get(updateProductDto.id)
        const productProperties = await product.getProductProperties()

        ProductService.checkProperties(category, propertiesReceived)
        
        await product.update({
            name: updateProductDto.name,
            price: updateProductDto.price
        })

        await product.setCategory(category)

        for (let property of propertiesReceived) {
            const productProperty = productProperties.find(productProp => productProp.propertyId == property.propertyId)

            if (!productProperty) {
                await ProductProperty.create({
                    value: property.value,
                    productId: product.id,
                    propertyId: property.propertyId
                })
            } else {
                await productProperty.update({
                    value: property.value,
                    productId: product.id,
                    propertyId: property.propertyId
                })
            }
        }

        if (updateProductDto.productCover) {
            const image = await ImageService.upload(updateProductDto.productCover)

            await product.addImage(image)
        }

        await product.reload({include: [Category, Image, {model: ProductProperty, include: [Property]}]})

        return product
    },

    belongsToSeller: async (userId: number, productId: number): Promise<boolean> => {
        const user = await UserService.findById(userId)
        const product = await ProductService.get(productId)
        const hasProduct = await user.hasSellerProduct(product)

        return hasProduct
    },

    delete: async (id: number): Promise<void> => {
        const product = await ProductService.get(id)

        await product.destroy()
    },

    getAll: async (productGetDto: IProductGetDto): Promise<IGetAllResult> => {
        const keys = await Product.findAll({
            attributes: ['id'],
            limit: productGetDto.pageSize,
            offset: productGetDto.offset,
            subQuery: false,
        })
        const amount = await Product.count()
        const page = productGetDto.page
        const pageSize = productGetDto.pageSize
        const hasNextPage = (amount - page * pageSize) > 0
        const hasPrevPage = keys.length && page > 1
        const whereFields = productGetDto.filterFields.map(field => [field[0], { [Op.like]: `%${field[1]}%`}])


        const products = await Product.findAll({
            where: {
                id: keys.map(key => key.id),
                ...Object.fromEntries(whereFields)
            },
            attributes: {
                include: [
                  [
                    sequelize.fn('AVG', sequelize.col('reviews.rating')), 'rating'
                  ]
                ]
            },
             
            include: [
                Category, 
                {model: ProductProperty, include: [Property]}, 
                Image,
                {
                    model: Review,
                    as: 'reviews',
                    attributes: [],
                    required: false
                },
            ],
            order: productGetDto.sortFields as any,
            group: [
                'product.id', 
                'category.id', 
                'productProperties.id', 
                'productProperties->property.id', 
                'images.id'
              ],
        })

        const result: IGetAllResult = {products}

        if (hasNextPage) {
            result.nextPage = page + 1
        }

        if (hasPrevPage) {
            result.prevPage = page - 1
        }

        return result
    },

    get: async (id: number): Promise<Product> => {
        const product = await Product.findByPk(id, 
            {
                include: [
                    Category, 
                    {model: ProductProperty, include: [Property]

                    },
                    {
                        model: Review,
                        as: 'reviews',
                        attributes: ['rating'],
                    },
                ]
            })

        if (!product) {
            throw new NotFound("Product not found")
        }
        
        return product
    }
}