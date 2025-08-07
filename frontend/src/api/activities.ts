import type {
  Activity,
} from "../types";

import env from "../utils/env";
import { checkResponse } from "./tractors";

const API_ENDPOINT = env.VITE_TRACTOR_API_URL;

async function getActivities() {
  const response = await fetch(`${API_ENDPOINT}/activities`);

  checkResponse(response);

  const data = (await response.json()) as Activity[];
  return data;
}

export const activitiesApi = {
  getActivities,
};
