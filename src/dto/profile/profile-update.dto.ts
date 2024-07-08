export interface IUpdateProfileDto {
    name: string
    birthDate: Date
    profileId: number
}

export class UpdateProfileDto implements IUpdateProfileDto {
    public name: string
    public birthDate: Date
    public profileId: number

    constructor(data: IUpdateProfileDto) {
        this.name = data.name
        this.birthDate = data.birthDate
        this.profileId = data.profileId
    }
}