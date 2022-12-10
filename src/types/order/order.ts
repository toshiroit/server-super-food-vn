export type OrderGetByUserData = {
  codeUser: string;
  page: string;
};

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
