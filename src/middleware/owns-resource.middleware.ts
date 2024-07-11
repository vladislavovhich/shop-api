import { Forbidden } from "@tsed/exceptions"
import { Request, Response, NextFunction } from "express"
import { UserService } from "../services/user.service"
import { IUserBelongsTo } from "../types/common.types"
import { Roles } from "../types/user.types"

export const ownsResource = <T extends Request>(get: (id: number) => Promise<IUserBelongsTo>, checkIsAdmin = false, resId = "id") => async (req: T, res: Response, next: NextFunction) => {
    try {
        const user = await UserService.extractUserFromReq(req)
        const resourceId = parseInt(req.params[resId])

        const item = await get(resourceId)

        if (checkIsAdmin && user.roleId == Roles.Admin) {
            return next()
        } else if (item && user && user.id == item.userId) {
            return next()
        } else {
            throw new Forbidden("Access denied")
        }
    } catch (error) {
        next(error)
    }
}