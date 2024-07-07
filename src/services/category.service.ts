import { BadRequest, NotFound } from "@tsed/exceptions"
import { CreateCategoryDto } from "../dto/category/category-create.dto"
import { UpdateCategoryDto } from "../dto/category/category-update.dto"
import Category from "../models/category.model"
import Property from "../models/property.model"
import { CategoryPropertyDto } from "../dto/category/category-property.dto"
import { PropertyService } from "./property.service"

export const CategoryService = {
    create: async (createCategoryDto: CreateCategoryDto): Promise<Category> => {
        const category = await Category.create({ 
            name: createCategoryDto.name
        })

        return category
    },

    update: async (updateCategoryDto: UpdateCategoryDto): Promise<Category> => {
        const category = await Category.findByPk(updateCategoryDto.id)
        
        if (!category) {
            throw new NotFound("Category not found")
        }

        await category.update({name: updateCategoryDto.name})

        return category
    },

    delete: async (id: number): Promise<void> => {
        const category = await Category.findByPk(id)

        if (!category) {
            throw new NotFound("Category not found")
        }

        await category.destroy()
    },

    get: async (id: number): Promise<Category> => {
        const category = await Category.findByPk(id)

        if (!category) {
            throw new NotFound("Category not found")
        }

        return category
    },

    getAll: async (): Promise<Category[]> => {
        const categories = await Category.findAll()

        return categories
    },

    addProperty: async (categoryPropertyDto: CategoryPropertyDto): Promise<Category> => {
        const category = await CategoryService.get(categoryPropertyDto.categoryId)
        const property = await PropertyService.get(categoryPropertyDto.propertyId)

        const hasProperty = await category.hasProperty(property)

        if (hasProperty) {
            throw new BadRequest(`You've already added property '${property.name}' to category '${category.name}'`)
        }

        await category.addProperty(property)
        await category.reload({ include: [Property] })

        return category
    },

    removeProperty: async (categoryPropertyDto: CategoryPropertyDto): Promise<Category> => {
        const category = await CategoryService.get(categoryPropertyDto.categoryId)
        const property = await PropertyService.get(categoryPropertyDto.propertyId)

        const hasProperty = await category.hasProperty(property)

        if (!hasProperty) {
            throw new BadRequest(`Category '${category.name}' has no property '${property.name}', so you can't remove it`)
        }

        await category.removeProperty(property)
        await category.reload({ include: [Property] })

        return category
    }
}

