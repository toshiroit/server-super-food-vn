import z, { number, object, string } from 'zod';
const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);
type Literal = z.infer<typeof literalSchema>;
export type Json = Literal | { [key: string]: Json } | Json[];
const jsonSchema: z.ZodType<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]));
export const addEvaluateByProductSchema = object({
  body: object({
    code_product: string({
      required_error: 'Không được bỏ trống ',
    }),
    evaluate_product: number({
      required_error: 'Không được bỏ trống ',
    }).min(1, {
      message: 'Tối thiểu phải là 1',
    }),
    evaluate_ship: number({
      required_error: 'Không được bỏ trống ',
    }).min(1, {
      message: 'Tối thiểu phải là 1',
    }),
    evaluate_progress: number({
      required_error: 'Không được bỏ trống ',
    }).min(1, {
      message: 'Tối thiểu phải là 1',
    }),
    images: jsonSchema,
    text: string({
      required_error: 'Không được bỏ trống ',
    }).max(500, {
      message: 'Tối đa 500 kí tự',
    }),
    code_order: string({
      required_error: 'Không được bỏ trống ',
    }),
  }),
});
