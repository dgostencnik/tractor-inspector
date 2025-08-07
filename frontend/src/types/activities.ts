import type { Feature, FeatureCollection, LineString } from "geojson";

export type Activity = {
  date: string;
  serialNumbers: string[]; // List of machines operated on that day
};

export type ActivityTrackFeature = Feature<LineString, {
  serialNumber: string;
}>;

export type ActivityTrackCollection = FeatureCollection<LineString, {
  serialNumber: string;
}>;
