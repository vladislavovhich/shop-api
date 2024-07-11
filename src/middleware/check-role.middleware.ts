import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
import { BadRequest, Forbidden } from "@tsed/exceptions";
import { Roles } from "../types/user.types";

export const isAllowed = <T extends Request>(roles: Roles[]) => async (req: T, res: Response, next: NextFunction) => {
    const user = await UserService.extractUserFromReq(req)

    if (user && roles.includes(user.roleId)) {
        return next()
    } else {
        throw new Forbidden("Access denied")
    }
}

export const isAdmin = <T extends Request>() => async (req: T, res: Response, next: NextFunction) => {
    const user = await UserService.extractUserFromReq(req)

    if (user.roleId == Roles.Admin) {
        return next()
    } else {
        throw new Forbidden("Access denied")
    }
}