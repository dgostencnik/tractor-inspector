import type { PaginatedResult, PaginationParams, Tractor, TractorTelemetryItem } from "../types";

import { TRACTOR_API_ENDPOINT } from "../utils/const";

function checkResponse(response: Response) {
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText ?? "Internal server error"}`);
  }
}

async function getTractors() {
  const response = await fetch(`${TRACTOR_API_ENDPOINT}/tractors`);

  checkResponse(response);

  const data = await response.json() as Tractor[];
  return data;
}

async function getTractor(serialNumber: string) {
  const response = await fetch(`${TRACTOR_API_ENDPOINT}/tractors/${serialNumber}`);

  checkResponse(response);

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

  checkResponse(response);

  const data = await response.json() as PaginatedResult<TractorTelemetryItem[]>;

  return data;
}

async function getTractorTelemetryItem(serialNumber: string, logId: number) {
  const response = await fetch(`${TRACTOR_API_ENDPOINT}/tractors/${serialNumber}/telemetry/${logId}`);

  checkResponse(response);

  const data = await response.json() as TractorTelemetryItem;
 
  return data;
}

export const tractorsApi = {
  getTractors,
  getTractor,
  getTractorTelemetry,
  getTractorTelemetryItem,
};
