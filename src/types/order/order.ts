export type OrderGetByUserData = {
  codeUser: string;
  page: string;
  text_search?: string | undefined;
  date_start?: string | undefined;
  date_end?: string | undefined;
  status_order?: any;
  sort_order?: any;
};
export type StatusOrder = '-1' | '-2' | '1' | '2' | '3' | '4' | '5' | '6' | null;
export type SortOrder = '1' | '2' | '3' | '4' | null;
export type DataGetOrdeDetailByUser = {
  code_user: string;
  code_order: string;
};

export type OrderValueSearch = {
  name_search: string | null;
  date_start: string | null;
  date_end: string | null;
  status_order: number | null;
  type_payment: number | null;
};

export type OrderGetValueData = {
  code_shop: string;
  type?: any;
  page: number;
  value_search: OrderValueSearch;
};
