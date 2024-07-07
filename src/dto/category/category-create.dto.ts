interface ICreateCategoryDto {
    name: string
}

class CreateCategoryDto implements ICreateCategoryDto {
    public name: string

    constructor(data: ICreateCategoryDto) {
        this.name = data.name
    }
}

export {CreateCategoryDto, ICreateCategoryDto} 