export const ROUTES_NAME = {
  AUTH: {
    LOGIN: '/login',
    SEND_CODE: '/send-code',
    CHECK_CODE: '/check-code',
    REGISTER: '/register',
    REST_PASSWORD: '/rest-password',
    VERIFY_USER: '/verify-user',
    VERIFY_CODE: '/verify-code',
    AUTHENTICATE: '/authenticate',
    LOGIN_PHONE: '/login-phone',
    VERIFY_TOKEN: '/verify-token',
    REFRESH_TOKEN: '/refresh-token',
    USER: '/getMe',
    GET_ALL_USERS: '/get-all-users',
    CHECK_PHONE: '/check-phone',
    LOGOUT: '/logout',
  },
  USER: {
    ADD_USER: '/add-user',
    UPDATE_USER: '/update-user-w1'
  },
  PRODUCT: {
    GET_ALL_PRODUCTS: '/get-all',
    GET_PRODUCT_BY_NAME_OR_CODE: '/get',
    GET_ALL_PRODUCT_SHOP: '/get-all-shop',
    GET_ALL_PRODUCT_TOP: '/get-all-top',
    GET_ALL_PRODUCT_PAY_TOP: '/get-all-pay-top'
  },
  COMMENT: {
    ADD_NEW_COMMENT: '/add-comment',
    GET_COMMENT: '/get-comment'
  },
  SEARCH: {
    SEARCH: '/search'
  },
  CART: {
    GET_CART: '/get-cart',
    ADD_CART: '/add-cart',
    REMOVE_CART: '/remove-cart'
  },
  ORDER: {
    HOME: '/order',
    GET_ORDER_DETAIL_BY_CODE: '/get-order',
    GET_ORDER_BY_USER: '/get-order-user',
    GET_ORDER_BY_ALL_ADMIN: '/get-order-all'
  },
  ADDRESS: {
    HOME: '/address',
    GET_ADDRESS: '/get-address'
  }
};

export const ROUTES_NAME_ADMIN = {
  AUTH: {
    LOGIN: '/login',
    GET_ME: '/getMe'
  }
}
