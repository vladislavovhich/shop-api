import { Request, Response } from "express"
import { UpdateUserProfileRequest } from "../types/user.types"
import { StatusCodes } from "http-status-codes"
import { IdRequest } from "../types/common.types"
import { UserService } from "../services/user.service"
import { UserDtoMapper } from "../mappers/user.mapper"

export const UserController = {
    updateProfile: async (req: UpdateUserProfileRequest, res: Response) => {
        const user = await UserService.extractUserFromReq(req)
        const updateProfileDto = UserDtoMapper.mapUpdateProfileDto(req, user)
        const userUpdated = await UserService.updateProfile(updateProfileDto)

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