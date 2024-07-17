import { User } from "../models/user.model"
import { CreateRequest, GetAllRequest, UpdateRequest } from "../types/product.types"
import { CreateProductDto, IPropertyDto, PropertyDto } from "../dto/product/product-create.dto"
import { UpdateProductDto } from "../dto/product/product-update.dto"
import { ProductGetDto, Fields } from "../dto/product/product-get.dto"

export const ProductDtoMapper = {
    mapCreateDto: (req: CreateRequest, user: User): CreateProductDto => {
        const {file} = req

        const properties: IPropertyDto[] = req.body.properties.map(property => new PropertyDto({
            propertyId: property.propertyId,
            value: property.value,
            name: property.name
        }))

        return new CreateProductDto({
            name: req.body.name,
            categoryId: parseInt(req.body.categoryId),
            price: parseFloat(req.body.price),
            properties,
            userId: user.id,
            productCover: file?.path
        })
    },

    mapUpdateDto: (req: UpdateRequest): UpdateProductDto => {
        const {file} = req
        
        const properties: IPropertyDto[] = req.body.properties.map(property => new PropertyDto({
            propertyId: property.propertyId,
            value: property.value,
            name: property.name
        }))

        return new UpdateProductDto({
            name: req.body.name,
            price: parseFloat(req.body.price),
            categoryId: parseInt(req.body.categoryId),
            id: parseInt(req.params.id),
            properties,
            productCover: file?.path
        })
    },

    mapGetAllDto: (req: GetAllRequest) => {
        let sortFields: Fields = [
            ["name", req.query.nameSort], 
            ["price", req.query.priceSort], 
            ["rating", req.query.ratingSort]
        ]

        let filterFields: Fields = [
            ["name", req.query.nameFilter], 
        ]

        sortFields = sortFields.filter(field => field[1]) as Fields
        filterFields = filterFields.filter(field => field[1]) as Fields

        let pageSize = 10, page = 1

        if (req.query.pageSize && !Number.isNaN(+req.query.pageSize)) {
            pageSize = +req.query.pageSize
        }

        if (req.query.page && !Number.isNaN(+req.query.page)) {
            page = +req.query.page
        }

        return new ProductGetDto({
            sortFields, 
            filterFields, 
            pageSize,
            page, 
            offset: 0
        })
    }
}