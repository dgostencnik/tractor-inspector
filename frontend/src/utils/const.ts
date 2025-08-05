import type { PaginationParams } from "../types";

import { SortOrders } from "../types";

export const TRACTOR_API_ENDPOINT = "http://localhost:3000";

export const defaultTractorImageUrl = "https://images.unsplash.com/photo-1530267981375-f0de937f5f13?q=80&w=640";

export const tractorDefaultPagination: PaginationParams = {
  page: 1,
  pageSize: 25,
  sort: "date_time",
  order: SortOrders.asc,
};
