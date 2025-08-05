export function addImageUrl(tractorData) {
  return {
    ...tractorData,
    imageUrl: `/images/${tractorData.serialNumber}.jpg`,
  };
}
