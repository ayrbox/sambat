import { MIN_DATE } from "./constants";
import { totalDaysTillDate } from "./utils/daysFunc";

export const convertToAD = (
  year: number,
  month: number,
  date: number
): Date => {
  const daysNumFromMinBsYear = totalDaysTillDate(year, month, date);
  const adDate = new Date(MIN_DATE.year, MIN_DATE.month, MIN_DATE.date - 1);
  adDate.setDate(adDate.getDate() + daysNumFromMinBsYear);
  return adDate;
};
