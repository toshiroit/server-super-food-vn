export type GetCategoryProductByShop = {
  page: string;
  limit?: string;
  code_shop: string;
};

export type CategoryData = {
  code_shop: string;
  category_code: string;
  name_category: string;
  url_path?: string;
  info_category: string;
  status_category: boolean;
  image: string;
};

export type CategoryRemove = {
  code_shop: string;
  category_code: string;
};
