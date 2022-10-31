import { Request, Response } from "express";

export const uploadImages = (req: Request, res: Response) => {
  res.json({
    message: "UP"
  })
}
