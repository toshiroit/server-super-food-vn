import { Request, Response } from "express";
import cloudinary from "../../utils/cloudinary/cloudinary";

export const uploadImages = async (req: Request, res: Response) => {
  res.json({
  })
}

export const uploadImage = async (req: Request, res: Response) => {
  try {
    const localFilePath = req.file?.path || ''
    await cloudinary.uploader.upload(localFilePath, {
      public_id: 'olympic_flag'
    }).then((result) => {
      res.json({
        is_upload: true,
        message: 'Tải lên thành công',
        data: result
      })
    }).catch((err) => {
      res.json({
        error: err
      })
    })

  } catch (err) {
    res.json({
      error: err
    })
  }
}
