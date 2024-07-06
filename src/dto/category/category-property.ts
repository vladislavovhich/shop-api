interface ICategoryPropertyDto {
    propertyId: number
    categoryId: number
}

class CategoryPropertyDto implements ICategoryPropertyDto {
    public categoryId: number
    public propertyId: number

    constructor(data: ICategoryPropertyDto) {
        this.categoryId = data.categoryId
        this.propertyId = data.propertyId
    }
}

export {CategoryPropertyDto, ICategoryPropertyDto} 