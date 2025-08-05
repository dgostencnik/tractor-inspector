import type { PaginatedResult, PaginationParams, Tractor, TractorTelemetryItem } from "../types";

import { TRACTOR_API_ENDPOINT } from "../utils/const";

async function getTractors() {
  const response = await fetch(`${TRACTOR_API_ENDPOINT}/tractors`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json() as Tractor[];
  return data;
}

async function getTractor(serialNumber: string) {
  const response = await fetch(`${TRACTOR_API_ENDPOINT}/tractors/${serialNumber}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json() as Tractor;

  return data;
}

async function getTractorTelemetry(serialNumber: string, { pageSize, page, sort, order }: PaginationParams) {
  const queryParams = new URLSearchParams();

  if (pageSize !== undefined) {
    queryParams.append("pageSize", pageSize.toString());
  }

  if (page !== undefined) {
    queryParams.append("page", page.toString());
  }
  if (sort !== undefined) {
    queryParams.append("sort", sort);
  }
  if (order !== undefined) {
    queryParams.append("order", order);
  }

  const url = `${TRACTOR_API_ENDPOINT}/tractors/${serialNumber}/telemetry?${queryParams.toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json() as PaginatedResult<TractorTelemetryItem[]>;

  return data;
}

export const tractorsApi = {
  getTractors,
  getTractor,
  getTractorTelemetry,
};
