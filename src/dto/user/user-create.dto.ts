export interface ICreateUserDto {
    email: string
    password: string
    roleId: number
    name: string
    birthDate: Date
}

export class CreateUserDto implements ICreateUserDto {
    public email: string
    public password: string
    public roleId: number
    public name: string
    public birthDate: Date

    constructor(data: ICreateUserDto) {
        this.email = data.email
        this.password = data.password
        this.roleId = data.roleId
        this.name = data.name
        this.birthDate = data.birthDate
    }
}