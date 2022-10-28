import config from "../config/config";

export const getPagination = (page: number) => {
  const limit = Number(config.search_product_limit_show) || 2;
  const offset = (page - 1) * limit;

  return { limit, offset };
};

export const getPagingData = (data: any, page: number, limit: number) => {
  const { count: totalItems, rows: tutorials } = data;
  const currentPage = page ? page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, tutorials, totalPages, currentPage };
};
