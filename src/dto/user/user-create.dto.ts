import { ICreateProfileDto } from "../profile/profile-create.dto"

export interface ICreateUserDto {
    email: string
    password: string
    roleId: number
    profile: ICreateProfileDto
}

export class CreateUserDto implements ICreateUserDto {
    public email: string
    public password: string
    public roleId: number
    public profile: ICreateProfileDto

    constructor(data: ICreateUserDto) {
        this.email = data.email
        this.password = data.password
        this.roleId = data.roleId
        this.profile = data.profile
    }
}