export const SortOrders = {
  asc: "asc",
  desc: "desc",
} as const;

export type SortOrder = typeof SortOrders[keyof typeof SortOrders];

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
