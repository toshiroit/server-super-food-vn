export type GetProductDetailTp = {
  code: string | null;
  name: string | null;
  page: string | null;
  size: string | null;
  title: string | null;
}
export type GetAllProductTp = {
  limit: number;
  typeSort: string;
  date?: string;
}
export type GetAllProductShop = {
  limit: string;
  code_shop: string;
}

export type TypeGetProductWP = 'new' | 'top' | 'top-pay'
