export interface ICreateProfileDto {
    name: string
    birthDate: Date
    userId: number
}

export class CreateProfileDto implements ICreateProfileDto {
    public name: string
    public birthDate: Date
    public userId: number

    constructor(data: ICreateProfileDto) {
        this.name = data.name
        this.birthDate = data.birthDate
        this.userId = data.userId
    }
}