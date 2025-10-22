export const getDefaultDueDate = () => {
  const today = new Date();
  today.setDate(today.getDate() + 14);

  const pad = (n: number) => `${n}`.toString().padStart(2, "0");
  return `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
};
