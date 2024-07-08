import { Strategy } from "passport-jwt"
import { User } from "../models/user.model"
import { Request } from "express"
import { IPayload } from "../types/auth.types"

const cookieExtractor = (req: Request) => {
    let jwt = null 

    if (req && req.cookies) {
        jwt = req.cookies['jwt']
    }

    return jwt
}

const opts = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: "secret",
};

export const jwtStrategy = new Strategy(opts, async (payload: IPayload, done) => {
    try {
        const user = User.findOne({
            where: {id: payload.id}
        })

        if (user) {
            return done(null, user)
        } else {
            return done(null, false)
        }
      } catch (error) {
          return done(error);
    }
})