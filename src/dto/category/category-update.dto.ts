interface IUpdateCategoryDto {
    name: string
    id: number
}

class UpdateCategoryDto implements IUpdateCategoryDto {
    public name: string
    public id: number

    constructor(data: IUpdateCategoryDto) {
        this.name = data.name
        this.id = data.id
    }
}

export {UpdateCategoryDto, IUpdateCategoryDto} 