import simplify from "simplify-js";

/**
 * Adds an imageUrl property to the given tractor data with a default image URL.
 *
 * @param {object} tractorData - The tractor data to add the image URL to.
 * @return {object} - The tractor data with the added imageUrl property.
 */
export function addImageUrl(tractorData) {
  return {
    ...tractorData, 
    imageUrl: `/images/${tractorData.serialNumber}.jpg`,
  };
}

/**
 * Sends a Zod validation error response.
 *
 * @param {object} res - The response object.
 * @param {object} error - The Zod error object.
 * @return {object} - The response with status 422 and JSON error details.
 */
export function sendZodError(res, error) {
  // Extract error messages and paths from Zod issues
  const messages = error.issues
    .map((issue) => `${issue.path.join("")}:${issue.message}`)
    .join(";");

  const data = error.issues.reduce((acc, curr) => {
    acc[curr.path.join("")] = curr.message;
    return acc;
  }, {});

  return res.status(422).json(data);
}


/**
 * Converts an array of points (lat, lng) to a GeoJSON LineString.
 *
 * @param {array} points - An array of points with lat and lng properties.
 * @return {object} - A GeoJSON LineString object.
 */
export function convertToGeoJSONLineString (points) {
  if (!points || points.length < 2) {
    return null; 
  }
  

  const coordinates = points.map(p => [
    parseFloat(p.lng),
    parseFloat(p.lat)
  ]);
  
  return {
    type: "LineString",
    coordinates: coordinates
  };
};


/**
 * Simplifies an array of points (lat, lng) using the simplify-js library.
 *
 * @param {array} points - An array of points with lat and lng properties.
 * @param {number} [tolerance=0.0001] - The tolerance used for simplifying.
 * @return {array} - An array of simplified points.
 */
export function simplifyPoints(points, tolerance = 0.0001){
  if (!points || points.length <= 2) return points;
  
  // Convert to simplify-js format
  const simplifyPoints = points.map(p => ({
    x: parseFloat(p.lng),
    y: parseFloat(p.lat)
  }));
  
  // Simplify
  const simplified = simplify(simplifyPoints, tolerance, true);
  
  // Convert back
  return simplified.map(p => ({
    lat: p.y,
    lng: p.x
  }));
};


export function createGeoJSONFeature(serialNumber, points) {
  const lineString = convertToGeoJSONLineString(points);
  
  if (!lineString) return null;
  
  return {
    type: "Feature",
    properties: {
      serialNumber: serialNumber,
    },
    geometry: lineString
  };
};