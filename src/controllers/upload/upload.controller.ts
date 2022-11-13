import { Request, Response } from "express";
import cloudinary from "../../utils/cloudinary/cloudinary";

const cloudinaryUploadImages = (imageItem: any) => {
  const urls: any[] = []
  cloudinary.uploader.upload(imageItem, {
    public_id: 'olympic_flag'
  }).then((result) => {
    const data = {
      is_upload: true,
      message: 'Tải lên thành công',
      data: result
    }
    urls.push(data)
    return urls;
  }).catch((err) => {
    return err
  })

}

export const uploadImage = async (req: Request, res: Response) => {
  try {
    const localFilePath = req.file?.path || ''
    await cloudinary.uploader.upload(localFilePath, {
      //     public_id: 'olympic_flag'
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

export const uploadImages = async (req: Request, res: Response) => {
  try {
    const images = req.files as Express.Multer.File[]
    const resultData: any[] = []

    if (images) {
      for (const file of images) {
        await cloudinary.uploader.upload(file.path, {
          //       public_id: 'olympic_flag'
        }).then((result) => {
          const data = {
            is_upload: true,
            message: 'Tải lên thành công',
            data: result
          }
          resultData.push(data)
        }).catch((err) => {
          res.json({
            error: err
          })
        })
      }
      res.json({
        data: resultData
      })
    }
  } catch (err) {
    res.json({
      error: err
    })
  }
}


