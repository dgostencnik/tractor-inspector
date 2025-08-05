export function addImageUrl(tractorData) {
  return {
    ...tractorData,
    imageUrl: `/images/${tractorData.serialNumber}.jpg`,
  };
}

export function sendZodError(res, error) {
  const messages = error.issues
    .map((issue) => `${issue.path.join("")}:${issue.message}`)
    .join(";");

  const data = error.issues.reduce((acc, curr) => {
    acc[curr.path.join("")] = curr.message;
    return acc;
  }, {});

  return res.status(422).json(data);
}
