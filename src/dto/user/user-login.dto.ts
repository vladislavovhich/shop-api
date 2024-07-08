export interface ILoginUserDto {
    email: string
    password: string
}

export class LoginUserDto {
    public email: string
    public password: string

    constructor(data: ILoginUserDto) {
        this.email = data.email
        this.password = data.password
    }
}