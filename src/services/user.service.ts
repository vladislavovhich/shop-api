import { Request } from "express"
import { User } from "../models/user.model"
import { BadRequest, NotFound } from "@tsed/exceptions"
import { UpdateProfileDto } from "../dto/user/user-update-profile.dto"
import { Image } from "../models/image.model"
import { ImageService } from "./image.service"

export const UserService = {
    extractUserFromReq: async (req: Request): Promise<User> => {
        const user = await req.user

        if (!user) {
            throw new BadRequest("User not specified")
        }

        return user
    },

    findByEmail: async (email: string): Promise<User | null> => {
        const user = await User.findOne({
            where: {email},
        })

        return user
    },

    findById: async (id: number): Promise<User> => {
        const user = await User.findByPk(id, {
            include: [Image]
        })

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

        if (updateProfileDto.profilePicture) {
            const image = await ImageService.upload(updateProfileDto.profilePicture)

            await user.addImage(image)
        }

        return user
    }
}