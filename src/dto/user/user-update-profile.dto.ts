export interface IUpdateProfileDto {
    name: string
    birthDate: Date
    userId: number
}

export class UpdateProfileDto implements IUpdateProfileDto {
    public name: string
    public birthDate: Date
    public userId: number

    constructor(data: IUpdateProfileDto) {
        this.name = data.name
        this.birthDate = data.birthDate
        this.userId = data.userId
    }
}