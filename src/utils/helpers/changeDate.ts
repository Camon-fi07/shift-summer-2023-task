import { daysOfWeek, months } from "utils/dates";

export const changeDate = (originDate: string): string => {
  const [day, month, year] = originDate.split(".");
  const date = new Date(Number("20" + year), Number(month) - 1, Number(day));
  return `${daysOfWeek[date.getUTCDay()]}, ${Number(day)} ${months[date.getMonth()]}`;
};
