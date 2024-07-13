import * as cloudinary from "cloudinary"
import "dotenv/config"
import { Image } from "../models/image.model"

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
})

export const ImageService = {
    upload: async (file: string): Promise<Image> => {
        const result = await cloudinary.v2.uploader.upload(file, { folder: "shopapi-images" })
        const {secure_url: image_url} = result
        const image = await Image.create({ url: image_url})

        return image
    }
}