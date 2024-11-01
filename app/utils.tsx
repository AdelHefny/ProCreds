export const convertTime = (currDate: Date) => {
  const DateCreated = currDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return DateCreated;
};
