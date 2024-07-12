import { Forbidden } from "@tsed/exceptions"
import { Request, Response, NextFunction } from "express"
import { UserService } from "../services/user.service"
import { IUserBelongsTo } from "../types/common.types"
import { Roles } from "../types/user.types"

export const ownsResource = <T extends Request>(checkFunction: (userId: number, itemId: number) => Promise<boolean>, checkIsAdmin = false, resId = "id") => async (req: T, res: Response, next: NextFunction) => {
    try {
        const user = await UserService.extractUserFromReq(req)
        const resourceId = parseInt(req.params[resId])
        const isBelongs = await checkFunction(user.id, resourceId)

        if (checkIsAdmin && user.roleId == Roles.Admin) {
            return next()
        } else if (user && isBelongs) {
            return next()
        } else {
            throw new Forbidden("Access denied")
        }
    } catch (error) {
        next(error)
    }
}