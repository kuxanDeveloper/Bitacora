export const format = (date) => {

  return [
    date.getDate().padStart(2, "0"),
    (date.getMonth() + 1).padStart(2, "0"),
    date.getFullYear(),
  ].join("/");
};
