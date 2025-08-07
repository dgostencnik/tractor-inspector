import type {
  Activity,
  ActivityTrackCollection,
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

async function getActivityTracks(date: string) {
  const response = await fetch(`${API_ENDPOINT}/activities/${date}`);

  checkResponse(response);

  const data = (await response.json()) as ActivityTrackCollection;
  return data;
}

export const activitiesApi = {
  getActivities,
  getActivityTracks,
};
