interface ICreatePropertyDto {
    typeId: number
    name: string
}

class CreatePropertyDto implements ICreatePropertyDto {
    public typeId: number
    public name: string

    constructor(data: ICreatePropertyDto) {
        this.typeId = data.typeId
        this.name = data.name
    }
}

export {CreatePropertyDto, ICreatePropertyDto} 