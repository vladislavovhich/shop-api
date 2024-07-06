interface IUpdatePropertyDto {
    typeId: number
    name: string
    id: number
}

class UpdatePropertyDto implements IUpdatePropertyDto {
    public typeId: number
    public id: number
    public name: string

    constructor(data: IUpdatePropertyDto) {
        this.typeId = data.typeId
        this.name = data.name
        this.id = data.id
    }
}

export {UpdatePropertyDto, IUpdatePropertyDto} 