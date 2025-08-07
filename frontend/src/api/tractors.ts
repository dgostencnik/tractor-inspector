import type {
  PaginatedResult,
  PaginationParams,
  Tractor,
  TractorTelemetryItem,
} from "../types";

import env from "../utils/env";

const TRACTOR_API_ENDPOINT = env.VITE_TRACTOR_API_URL;

export function checkResponse(response: Response) {
  if (!response.ok) {
    throw new Error(
      `${response.status} ${response.statusText ?? "Internal server error"}`,
    );
  }
}

async function getTractors() {
  const response = await fetch(`${TRACTOR_API_ENDPOINT}/tractors`);

  checkResponse(response);

  const data = (await response.json()) as Tractor[];
  return data;
}

async function getTractor(serialNumber: string) {
  const response = await fetch(
    `${TRACTOR_API_ENDPOINT}/tractors/${serialNumber}`,
  );

  checkResponse(response);

  const data = (await response.json()) as Tractor;
  return data;
}

async function getTractorTelemetry(
  serialNumber: string,
  { pageSize, page, sort, order }: PaginationParams,
) {
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

  const data = (await response.json()) as PaginatedResult<
    TractorTelemetryItem[]
  >;

  return data;
}

async function getTractorTelemetryItem(serialNumber: string, logId: number) {
  const response = await fetch(
    `${TRACTOR_API_ENDPOINT}/tractors/${serialNumber}/telemetry/${logId}`,
  );

  checkResponse(response);

  const data = (await response.json()) as TractorTelemetryItem;

  return data;
}

async function updateTractorTelemetryItem(
  serialNumber: string,
  logId: number,
  editformData: unknown,
) {
  const response = await fetch(
    `${TRACTOR_API_ENDPOINT}/tractors/${serialNumber}/telemetry/${logId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editformData),
    },
  );

  if (!response.ok) {
    const errorMessages = await response.json();

    if (response.status === 422) {
      throw new Error(
        JSON.stringify({
          message: JSON.stringify(errorMessages),
          code: "VALIDATION_ERROR",
        }),
      );
    }
  }

  checkResponse(response);

  const data = (await response.json()) as TractorTelemetryItem;

  return data;
}

export const tractorsApi = {
  getTractors,
  getTractor,
  getTractorTelemetry,
  getTractorTelemetryItem,
  updateTractorTelemetryItem,
};
