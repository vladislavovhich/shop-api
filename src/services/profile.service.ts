import { CreateProfileDto } from "../dto/profile/profile-create.dto"
import { Profile } from "../models/profile.model"
import { UserService } from "./user.service"
import { User } from "../models/user.model"
import { UpdateProfileDto } from "../dto/profile/profile-update.dto"
import { NotFound } from "@tsed/exceptions"

export const ProfileService = {
    create: async (createProfileDto: CreateProfileDto): Promise<Profile> => {
        const profile = await Profile.create({
            name: createProfileDto.name,
            birthDate: createProfileDto.birthDate
        })
        const user = await UserService.findById(createProfileDto.userId)

        await profile.setUser(user)

        return profile
    },

    update: async (updateProfileDto: UpdateProfileDto): Promise<Profile> => {
        const profile = await ProfileService.get(updateProfileDto.profileId)

        await profile.update({
            name: updateProfileDto.name,
            birthDate: updateProfileDto.birthDate
        })

        return profile
    },

    delete: async (id: number): Promise<void> => {
        const profile = await ProfileService.get(id)
        
        await profile.destroy()
    },

    getAll: async (): Promise<Profile[]> => {
        const profiles = await Profile.findAll()

        return profiles
    },

    get: async (id: number) => {
        const profile = await Profile.findByPk(id)

        if (!profile) {
            throw new NotFound("Profile not found")
        }

        return profile
    }
}