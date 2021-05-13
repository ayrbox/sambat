import {
  MAX_SAMBAT,
  MIN_DATE,
  MIN_SAMBAT,
  SAMBAT_NUMBER_OF_DAYS,
  SAMBAT_NUMBER_OF_DAYS_OCCURANCE,
} from "./constants";

/**
 * Returns total number of days until the date provide since start (min) date.
 * @param year
 * @param month
 * @param date
 * @returns
 */
export const totalDaysTillDate = (
  year: number,
  month: number,
  date: number
): number => {
  if (year < MIN_SAMBAT.year || year > MAX_SAMBAT.year) {
    throw new Error("Year out of range.");
  }

  const yearsTillDate = year - MIN_SAMBAT.year;

  // arrays to loop through months
  const months = new Array<number>(12).fill(undefined).map((_, idx) => idx + 1);

  // 1 to month (yearsTillDate + 1)
  // month to 12 (yearsTillDate)

  // Total number of days since intital date
  const totalDays = months.reduce(
    (total, monthIdx) =>
      total +
      totalNumberOfDaysByMonth(
        monthIdx,
        monthIdx < month ? yearsTillDate + 1 : yearsTillDate
      ),
    0
  );

  // Adjust date count
  switch (true) {
    case year > 2085 && year < 2088:
      return totalDays + date - 2;
    case year === 2085 && month > 5:
      return totalDays + date - 2;
    case year > 2088:
      return totalDays + date - 4;
    case year === 2088 && month > 5:
      return totalDays + date - 4;
    default:
      return totalDays + date;
  }
};

// get me total days till year for given month
export const totalNumberOfDaysByMonth = (
  month: number,
  yearDiff: number
): number => {
  if (yearDiff === 0) return 0;
  const monthData = SAMBAT_NUMBER_OF_DAYS_OCCURANCE[month - 1];
  const { data } = monthData.reduce(
    (acc, y) => {
      if (acc.remainder === 0) return acc;

      if (acc.remainder < y) {
        return {
          data: [...acc.data, acc.remainder],
          remainder: 0,
        };
      }

      return {
        data: [...acc.data, y],
        remainder: acc.remainder - y,
      };
    },
    {
      data: [],
      remainder: yearDiff,
    }
  );

  return data
    .map((o, idx) => {
      const numberOfDays = SAMBAT_NUMBER_OF_DAYS[month - 1][idx % 2]; // number of days in month
      return numberOfDays * o;
    })
    .reduce((total, days) => total + days, 0);
};

export const convertBStoAD = (
  year: number,
  month: number,
  date: number
): Date => {
  const daysNumFromMinBsYear = totalDaysTillDate(year, month, date);
  const adDate = new Date(MIN_DATE.year, MIN_DATE.month, MIN_DATE.date - 1);
  adDate.setDate(adDate.getDate() + daysNumFromMinBsYear);
  return adDate;
};
