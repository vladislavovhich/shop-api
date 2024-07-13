export interface IPropertyDto {
    propertyId: number
    value: string
    name: string
}

export interface ICreateProductDto {
    name: string
    price: number
    categoryId: number
    properties: IPropertyDto[]
    userId: number
    productCover?: string
}

export class PropertyDto implements IPropertyDto {
    public propertyId: number
    public value: string
    public name: string

    constructor(data: IPropertyDto) {
        this.propertyId = data.propertyId
        this.value = data.value
        this.name = data.name
    }
}

export class CreateProductDto implements ICreateProductDto {
    public name: string
    public price: number
    public categoryId: number
    public properties: IPropertyDto[]
    public userId: number
    public productCover?: string | undefined

    constructor(data: ICreateProductDto) {
        this.name = data.name
        this.price = data.price
        this.categoryId = data.categoryId
        this.properties = data.properties
        this.userId = data.userId
        this.productCover = data.productCover
    }
}