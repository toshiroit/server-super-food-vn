export type VoucherDataAddNew = {
  code_voucher: string;
  name_voucher: string;
  price_voucher: number;
  code_type_voucher: string;
  description: string;
  code_w_voucher: string;
  time_start: string;
  time_end: string;
  createdat: string;
  quality: number;
  code_shop: string;
  code_product: Array<VoucherCodeProductType>;
  type_price: 'price' | 'percent';
};
export type VoucherDataType = {
  code_type_voucher: string;
  name_type: string;
  status_type: boolean;
};

export type VoucherCodeProductType = {
  code_product: string;
};

export type VoucherDataFilter = {
  type_voucher: string | null;
  name_voucher: string | null;
  time_start: string | null;
  time_end: string | null;
  status: boolean | null;
};
