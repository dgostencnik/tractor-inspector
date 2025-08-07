export function getCenter(points: { lat: number; lng: number }[]): [number, number] {
  const lats = points.map(p => p.lat);
  const lngs = points.map(p => p.lng);

  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  const center: [number, number] = [(minLat + maxLat) / 2, (minLng + maxLng) / 2];

  return center;
}

export function getRandomColor(): string {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `#${[r, g, b].map(x => x.toString(16).padStart(2, "0")).join("")}`;
}

const knownFeatures: Record<string, string> = {
  A2302895: "red",
  A2302900: "green",
  A6002059: "blue",
};

export function getColorForFeature(serialNumber: string) {
  return knownFeatures[serialNumber] ?? getRandomColor();
}
