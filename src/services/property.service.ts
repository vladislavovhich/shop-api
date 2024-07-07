import { BadRequest, NotFound } from "@tsed/exceptions"
import { CreatePropertyDto } from "../dto/property/property-update.dto"
import Property from "../models/property.model"
import Type from "../models/type.model"
import { UpdatePropertyDto } from "../dto/property/property-create.dto"

export const PropertyService = {
    create: async (createPropertyDto: CreatePropertyDto): Promise<Property> => {
        const type = await Type.findByPk(createPropertyDto.typeId) 

        if (!type) {
            throw new NotFound("Type not found")
        }

        const property = await Property.create({ 
            type, 
            name: createPropertyDto.name 
        })

        await property.setType(type)
        await property.reload({ include: Type })

        return property
    },

    update: async (updatePropertyDto: UpdatePropertyDto): Promise<Property> => {
        const type = await Type.findByPk(updatePropertyDto.typeId) 
        const property = await PropertyService.get(updatePropertyDto.id)

        if (!type) {
            throw new NotFound("Type not found")
        }

        await property.update({name: updatePropertyDto.name})
        await property.setType(type)

        await property.reload({ include: Type })

        return property
    },

    delete: async (id: number): Promise<void> => {
        const property = await Property.findByPk(id)

        if (!property) {
            throw new NotFound("Property not found")
        }

        await property.destroy()
    },

    getAll: async (): Promise<Property[]> => {
        const properties = await Property.findAll({
            include: Type
        })

        return properties
    },

    get: async (id: number): Promise<Property> => {
        const property = await Property.findByPk(id, {
            include: Type
        })

        if (!property) {
            throw new NotFound("Property not found")
        }

        return property
    }
}