import { IPropertyDto } from "./product-create.dto"

interface IUpdateProductDto {
    id: number
    name: string
    price: number
    categoryId: number
    properties: IPropertyDto[]
}

class UpdateProductDto implements IUpdateProductDto {
    public id: number
    public name: string
    public price: number
    public categoryId: number
    public properties: IPropertyDto[]

    constructor(data: IUpdateProductDto) {
        this.id = data.id
        this.name = data.name
        this.price = data.price
        this.categoryId = data.categoryId
        this.properties = data.properties
    }
}

export {UpdateProductDto, IUpdateProductDto} 