import {
  MAX_SAMBAT,
  MIN_SAMBAT,
  SAMBAT_NUMBER_OF_DAYS,
  SAMBAT_NUMBER_OF_DAYS_OCCURANCE,
} from "../constants";

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

  const computeFunc = computeDaysByMonth(month, year);
  const totalDays = SAMBAT_NUMBER_OF_DAYS_OCCURANCE.map(computeFunc).reduce(
    (t, days) => t + days
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

/**
 *  Compute number of days in past months till MIN_DATE (1913).
 * @param month
 * @param year
 * @returns functions that takes repetitive occurance for months, that returns total number of days for the month since MIN_DATE
 */
export const computeDaysByMonth = (month: number, year: number) => {
  const numberOfYears = year - MIN_SAMBAT.year;

  return (monthData: number[], monthIdx: number) => {
    if (numberOfYears === 0) return 0;

    // Number of years to compute. Include days from past months for this years too.
    const years = monthIdx < month - 1 ? numberOfYears + 1 : numberOfYears;

    const [_, occurances] = monthData.reduce(
      ([remaining, occurances], occurance) => {
        if (remaining === 0) return [remaining, occurances];
        if (remaining < occurance) {
          return [0, [...occurances, remaining]];
        }
        return [remaining - occurance, [...occurances, occurance]];
      },
      [years, []] as [number, number[]]
    );

    return occurances
      .map((occurance, idx) => {
        const numberOfDays = SAMBAT_NUMBER_OF_DAYS[monthIdx][idx % 2];
        return numberOfDays * occurance;
      })
      .reduce((t, days) => t + days, 0);
  };
};
