import { CreateRequest, UpdateRequest } from "../types/property.types"
import { CreatePropertyDto } from "../dto/property/property-update.dto"
import { UpdatePropertyDto } from "../dto/property/property-create.dto"

export const PropertyDtoMapper = {
    mapCreateDto: (req: CreateRequest): CreatePropertyDto => {
        const typeId = parseInt(req.body.typeId)

        return new CreatePropertyDto({
            typeId,
            name: req.body.name
        })
    },

    mapUpdateDto: (req: UpdateRequest): UpdatePropertyDto => {
        const propertyId = parseInt(req.params.id)
        const typeId = parseInt(req.body.typeId)
 
        return new UpdatePropertyDto({
            id: propertyId,
            typeId, 
            name: req.body.name
        })
    }
}