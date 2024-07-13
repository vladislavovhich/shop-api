
export interface IUpdateProfileDto {
    name: string
    birthDate: Date
    userId: number
    profilePicture?: string
}

export class UpdateProfileDto implements IUpdateProfileDto {
    public name: string
    public birthDate: Date
    public userId: number
    public profilePicture?: string | undefined

    constructor(data: IUpdateProfileDto) {
        this.name = data.name
        this.birthDate = data.birthDate
        this.userId = data.userId
        this.profilePicture = data.profilePicture
    }
}