export type GetProductByCodeAndShop = {
  code_product: string;
  code_shop: string;
}

export type AddTypeProductByShop = {
  code_product_type: string;
  name_product_type: string;
  status: boolean;
  code_shop: string;
}
