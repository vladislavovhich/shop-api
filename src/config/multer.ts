import { BadRequest } from "@tsed/exceptions"
import { Request } from "express"
import multer, { FileFilterCallback } from "multer"

const storage = multer.diskStorage({
    filename: function (req: Request, file: Express.Multer.File, cb) {
        cb(null, file.originalname)
    }
})

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const allowedFormats = ["image/jpeg", "image/png"]

    if (allowedFormats.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

export const upload = multer({
    storage: storage,
    fileFilter: fileFilter
})