import { BadRequest, NotFound } from "@tsed/exceptions";
import { CreateProductDto, IPropertyDto } from "../dto/product/product-create.dto";
import { Product } from "../models/product.model";
import { CategoryService } from "./category.service";
import { Category } from "../models/category.model";
import { UpdateProductDto } from "../dto/product/product-update.dto";
import { ProductProperty } from "../models/product-property.model";
import { Property } from "../models/property.model";

export const ProductService = {
    checkProperties: (category: Category, propertiesReceived: IPropertyDto[]) => {
        const properties = category.properties

        let isValid = properties.every(property => propertiesReceived.some(prop => prop.propertyId == property.id))

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

        await product.reload({include: [Category, {model: ProductProperty, include: [Property]}]})

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

       await product.reload({include: [Category, {model: ProductProperty, include: [Property]}]})

        return product
    },

    delete: async (id: number): Promise<void> => {
        const product = await ProductService.get(id)

        await product.destroy()
    },

    getAll: async (): Promise<Product[]> => {
        const products = await Product.findAll({include: [Category, {model: ProductProperty, include: [Property]}]})

        return products
    },

    get: async (id: number): Promise<Product> => {
        const product = await Product.findByPk(id, {include: [Category, {model: ProductProperty, include: [Property]}]})

        if (!product) {
            throw new NotFound("Product not found")
        }
        
        return product
    }
}