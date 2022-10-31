import cloudinary from 'cloudinary'
import config from '../config/config'
const cloudinaryDB = cloudinary.v2.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret
})
export default cloudinaryDB


