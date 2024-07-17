import { CreateRequest, PropertyActionRequest } from "../types/category.types"
import { CreateCategoryDto } from "../dto/category/category-create.dto"
import { UpdateCategoryDto } from "../dto/category/category-update.dto"
import { CategoryPropertyDto } from "../dto/category/category-property.dto"

export const CategoryDtoMapper = {
    mapCreateDto: (req: CreateRequest): CreateCategoryDto => {
        return new CreateCategoryDto({
            name: req.body.name
        })
    },

    mapUpdateDto: (req: CreateRequest): UpdateCategoryDto => {
        const categoryId = parseInt(req.params.id)

        return new UpdateCategoryDto({
            name: req.body.name,
            id: categoryId
        })
    },

    mapPropertyDto: (req: PropertyActionRequest): CategoryPropertyDto => {
        const propertyId = parseInt(req.params.propertyId)
        const categoryId = parseInt(req.params.categoryId)

        return new CategoryPropertyDto({
            propertyId, 
            categoryId
        })
    }
}