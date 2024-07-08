export interface ICreateUserDto {
    email: string
    password: string
    roleId: number
}

export class CreateUserDto implements ICreateUserDto {
    public email: string
    public password: string
    public roleId: number

    constructor(data: ICreateUserDto) {
        this.email = data.email
        this.password = data.password
        this.roleId = data.roleId
    }
}