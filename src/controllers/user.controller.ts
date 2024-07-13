import { Request, Response } from "express"
import { UpdateUserProfileRequest } from "../types/user.types"
import { StatusCodes } from "http-status-codes"
import { BadRequest } from "@tsed/exceptions"
import { User } from "../models/user.model"
import { IdRequest } from "../types/common.types"
import { UpdateProfileDto } from "../dto/user/user-update-profile.dto"
import { UserService } from "../services/user.service"
import { ImageService } from "../services/image.service"
export const UserController = {
    updateProfile: async (req: UpdateUserProfileRequest, res: Response) => {
        const user = await UserService.extractUserFromReq(req)
        const file = req.file

        const userUpdated = await UserService.updateProfile(new UpdateProfileDto({
            name: req.body.name,
            birthDate: new Date(req.body.birthDate),
            userId: user.id,
            profilePicture: file?.path
        }))

        res.status(StatusCodes.OK).send({ user: userUpdated })
    },

    getProfile: async (req: IdRequest, res: Response) => {
        const user = await UserService.findById(parseInt(req.params.id))

        res.status(StatusCodes.OK).send({ user })
    },

    getMyProfile: async (req: Request, res: Response) => {
        const user = await UserService.extractUserFromReq(req)

        res.status(StatusCodes.OK).send({ user })
    }
}