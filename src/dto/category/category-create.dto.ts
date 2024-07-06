interface ICreateCategoryDto {
    name: string
    id: number
}

class CreateCategoryDto implements ICreateCategoryDto {
    public name: string
    public id: number

    constructor(data: ICreateCategoryDto) {
        this.name = data.name
        this.id = data.id
    }
}

export {CreateCategoryDto, ICreateCategoryDto} 