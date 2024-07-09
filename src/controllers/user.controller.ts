import { Request, Response } from "express"
import { UpdateUserProfileRequest } from "../types/user.types"
import { StatusCodes } from "http-status-codes"
import { BadRequest } from "@tsed/exceptions"
import { User } from "../models/user.model"
import { IdRequest } from "../types/property.types"
import { UpdateProfileDto } from "../dto/user/user-update-profile.dto"
import { UserService } from "../services/user.service"

export const UserController = {
    updateProfile: async (req: UpdateUserProfileRequest, res: Response) => {
        // #swagger.tags = ['User']

        const user = (await req.user) as User

        if (!user) {
            throw new BadRequest("No user specified")
        }

        const userUpdated = await UserService.updateProfile(new UpdateProfileDto({
            name: req.body.name,
            birthDate: new Date(req.body.birthDate),
            userId: user.id
        }))

        res.status(StatusCodes.OK).send({ user: userUpdated })
    },

    getProfile: async (req: IdRequest, res: Response) => {
        // #swagger.tags = ['User']

        const user = await UserService.findById(parseInt(req.params.id))

        res.status(StatusCodes.OK).send({ user })
    },

    getMyProfile: async (req: Request, res: Response) => {
        // #swagger.tags = ['User']

        const user = (await req.user) as User

        if (!user) {
            throw new BadRequest("User not specified")
        }

        res.status(StatusCodes.OK).send({ user })
    }
}