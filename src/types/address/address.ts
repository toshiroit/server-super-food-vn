export type GetAddressByUser = {
  code_user: string;
};

export type DataAddressSQL = {
  data: {
    code_address: string;
    code_user: string;
    full_name: string;
    phone: string;
    detail_address: string;
    status: boolean;
    code_address_detail: string;
    phone_w: string;
    email: string;
    street: string;
    village: string;
    district: string;
    province: string;
    city: string;
  };
};
