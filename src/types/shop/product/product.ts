export type GetProductByCodeAndShop = {
  code_product: string;
  code_shop: string;
};

export type AddTypeProductByShop = {
  code_product_type: string;
  name_product_type: string;
  status: boolean;
  code_shop: string;
};
export type GetALlProductTp = {
  code_shop: string;
  q?: string;
  page?: number;
  code_category: string;
  code_product_type: string;
  price_min: number;
  price_max: number;
  type?: 'top' | 'new' | 'top-pay';
  type_filter: 'ALL' | 'SELL' | 'BLOCK' | 'HIDE' | null;
  sort: number;
};
export type DataTypeShow = 'ALL' | 'SELL' | 'BLOCK' | 'HIDE' | null;
