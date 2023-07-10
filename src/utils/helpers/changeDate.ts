import { daysOfWeek, months } from "utils/consts/dates";

export const getDayInfo = (standartDate: string): string => {
  const [day, month, year] = standartDate.split(".");
  const date = new Date(Number("20" + year), Number(month) - 1, Number(day));
  return `${daysOfWeek[date.getUTCDay()]}, ${Number(day)} ${months[date.getMonth()]}`;
};

export const getSeanseInfo = (standartDate: string): string => {
  const [day, month, year] = standartDate.split(".");
  const date = new Date(Number("20" + year), Number(month) - 1, Number(day));
  return `${Number(day)} ${months[date.getMonth()]}`;
};
