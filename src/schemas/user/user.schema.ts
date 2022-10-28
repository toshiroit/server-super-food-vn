import { boolean, object, string } from "zod";

export const updateUserW1Schema = object({
  body: object({
    fullName: string({
      required_error: "Full name is required"
    }),
    date: string({
      required_error: "Date is required"
    }),
    sex: boolean({
      required_error: "Sex is required"
    }),
  })
})
