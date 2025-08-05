export const SORT_ORDERS = {
  ASC: "ASC",
  DESC: "DESC",
} as const;

export type SORT_ORDER = typeof SORT_ORDERS[keyof typeof SORT_ORDERS];

export type PaginationParams = {
  pageSize?: number;
  page?: number;
  sort?: string;
  order?: string;
};

export type PaginatedResult<T> = {
  page: number;
  pageSize: number;
  total: number;
  data: T;

};
