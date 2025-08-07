import type {
  Activity,
  ActivityLogRecord,
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

async function getActivityLogsForTractors(serialNumbers: string[], date: string) {
  const promises = serialNumbers.map(serialNumber => fetch(`${API_ENDPOINT}/activities/${date}/${serialNumber}`).then(res => res.json()));

  const responses = await Promise.all(promises);

  const result = new Map<string, ActivityLogRecord>();

  responses.forEach((response, index) => {
    result.set(serialNumbers[index], {
      points: response,
      min: new Date(response[0].date).getTime(),
      max: new Date(response[response.length - 1].date).getTime(),
    });
  });

  return result;
}

export const activitiesApi = {
  getActivities,
  getActivityTracks,
  getActivityLogsForTractors,
};
