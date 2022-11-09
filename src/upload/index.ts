import cloudinary from 'cloudinary'
import config from '../config/config'
import multer, { FileFilterCallback } from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import { Request, Response } from 'express'
const cloudinaryDB = cloudinary.v2.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret
})
const storage = multer.diskStorage({
  filename(req, file, callback) {
    callback(null, new Date().toISOString() + '-' + file.originalname)
  },
})


const fileFilter = (req: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    callback(null, true)
  }
  else {
    callback(null, false)
  }
}
const uploadFile = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 },
  fileFilter: fileFilter,
})

export {
  uploadFile,
  cloudinaryDB
}


