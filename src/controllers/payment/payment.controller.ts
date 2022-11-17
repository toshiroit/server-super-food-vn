import { Request, Response } from "express";
import { PaymentModel } from "../../models/payment/payment.model";

export const getAllPayment = async (req: Request, res: Response) => {
  try {
    await PaymentModel.getAllPayment((err, result) => {
      if (err) {
        res.json({
          error: err
        })
      }
      else {
        if (result) {
          res.json({
            data: result.rows
          })
        }
      }
    })
  } catch (err) {
    res.json({
      error: err
    })
  }
}
