import { User } from "../models/user.model"
import { Role } from "../models/role.model"
import { BadRequest, NotFound } from "@tsed/exceptions"
import { UpdateProfileDto } from "../dto/user/user-update-profile.dto"

export const UserService = {
    findByEmail: async (email: string): Promise<User | null> => {
        const user = await User.findOne({where: {email}})

        return user
    },

    findById: async (id: number): Promise<User> => {
        const user = await User.findByPk(id)

        if (!user) {
            throw new NotFound("User not found")
        }

        return user
    },

    updateProfile: async (updateProfileDto: UpdateProfileDto) => {
        const user = await UserService.findById(updateProfileDto.userId)

        if (!user) {
            throw new NotFound("User not found")
        }

        await user.update({
            name: updateProfileDto.name,
            birthDate: updateProfileDto.birthDate
        })

        return user
    }
}