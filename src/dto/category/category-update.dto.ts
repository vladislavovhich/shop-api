interface IUpdateCategoryDto {
    name: string
}

class UpdateCategoryDto implements IUpdateCategoryDto {
    public name: string

    constructor(data: IUpdateCategoryDto) {
        this.name = data.name
    }
}

export {UpdateCategoryDto, IUpdateCategoryDto} 