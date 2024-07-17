import { User } from "../models/user.model";
import { CreateUserRequest, LoginUserRequest, UpdateUserProfileRequest } from "../types/user.types";
import { CreateUserDto } from "../dto/user/user-create.dto";
import { LoginUserDto } from "../dto/user/user-login.dto";
import { UpdateProfileDto } from "../dto/user/user-update-profile.dto";

export const UserDtoMapper = {
    mapCreateDto: (req: CreateUserRequest): CreateUserDto => {
        const file = req.file

        return new CreateUserDto({
            email: req.body.email,
            password: req.body.password,
            roleId: parseInt(req.body.roleId),
            name: req.body.name,
            birthDate: new Date(req.body.birthDate),
            profilePicture: file?.path
        })
    },

    mapLoginDto: (req: LoginUserRequest): LoginUserDto => {
        return new LoginUserDto({
            email: req.body.email, 
            password: req.body.password
        })
    },

    mapUpdateProfileDto: (req: UpdateUserProfileRequest, user: User): UpdateProfileDto => {
        const file = req.file

        return new UpdateProfileDto({
            name: req.body.name,
            birthDate: new Date(req.body.birthDate),
            userId: user.id,
            profilePicture: file?.path
        })
    }
}