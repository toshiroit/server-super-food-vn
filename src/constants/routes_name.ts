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
    GET_ALL_PRODUCT_PAY_TOP: '/get-all-pay-top',
    GET_ALL_PRODUCT_NEW_SHOP: '/get-all-new-shop',
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
  },
  CHECKOUT: '/checkout',
  PAYMENT: {
    HOME: '/payment',
    GET_ALL_PAYMENT: '/get-all-pay-ment'
  },
  NOTIFICATION: {
    HOME: '/notification',
    CHECKOUT: '/checkout'
  }
};

export const ROUTES_NAME_SHOP = {
  AUTH: {
    LOGIN: '/login',
    GET_ME: '/getMe',
    GET_ME_SHOP: '/getMeShop',
    REGISTER: '/register'
  },
  CATEGORY: {
    HOME: '/category',
    CATEGORY_ALL: '/get-by-product-shop',
    CATEGORY_ALL_BY_SHOP: '/get-all-category-by-shop'
  },
  PRODUCT: {
    HOME: '/product',
    ADD_PRODUCT: '/add-product',
    GET_PRODUCT_BY_CODE: '/get-product-by-code-and-shop',
    GET_ALL_PRODUCT: '/get-all-product',
    GET_ALL_TYPE_PRODUCT: '/get-all-type-product',
    ADD_TYPE_PRODUCT: '/add-type-product',
    REMOVE_PRODUCT_BY_SHOP: '/remove-product-by-shop',
    SEARCH_PRODUCT_BY_VALUE_AND_SHOP: '/searc-product-by-value-and-shop',
    UPDATE_PRODUCT_PRODUCT_BY_CODE_AND_SHOP: '/update-product-by-code-and-shop'
  },
  UPLOAD: {
    home: '/upload',
    image: '/image',
    images: '/images',
    video: '/video',
    videos: 'videos'
  },
  ORDER: {
    HOME: '/order',
    ADD_ORDER_BY_SHOP: '/add-order-by-shop',
    HIDE_ORDER_BY_SHOP: '/hide-order-by-shop',
    REMOVE_ORDER_BY_SHOP: '/remove-order-by-shop',
    GET_ALL_ORDER_BY_SHOP: '/get-all-order-by-shop',
    GET_ALL_PRODUCT_BY_ORDER_AND_SHOP: '/get-all-product-by-order-and-shop',

  }
}
