import {
  DATE,
  MIN_SAMBAT,
  SAMBAT_NUMBER_OF_DAYS,
  SAMBAT_NUMBER_OF_DAYS_OCCURANCE,
} from "./constants";
import { convertToAD } from "./convertToAD";

export const convertToSambat = (
  year: number,
  month: number,
  date: number
): string | DATE => {
  let bsYear = year + 57;
  let bsMonth = (month + 9) % 12;
  bsMonth = bsMonth === 0 ? 12 : bsMonth;
  let bsDate = 1;
  if (month < 4) {
    bsYear -= 1;
  }

  const bsMonthFirstAdDate = convertToAD(bsYear, bsMonth, 1);

  if (date >= 1 && date < bsMonthFirstAdDate.getDate()) {
    if (month === 4) {
      const bsYearFirstAdDate = convertToAD(bsYear, 1, 1);
      if (date < bsYearFirstAdDate.getDate()) {
        bsYear -= 1;
      }
    }
    bsMonth = bsMonth !== 1 ? bsMonth - 1 : 12;
    const bsMonthDays = getBsMonthDays(bsYear, bsMonth);
    bsDate = bsMonthDays - (bsMonthFirstAdDate.getDate() - date) + 1;
  } else {
    bsDate = date - bsMonthFirstAdDate.getDate() + 1;
  }

  return { year: bsYear, month: bsMonth, date: bsDate };
};

export const getBsMonthDays = (bsYear: number, bsMonth: number) => {
  let yearCount = 0;
  const totalYears = bsYear + 1 - MIN_SAMBAT.year;
  const bsMonthData = SAMBAT_NUMBER_OF_DAYS_OCCURANCE[bsMonth - 1];
  for (let i = 0; i < bsMonthData.length; i++) {
    if (bsMonthData[i] === 0) {
      continue;
    }
    const bsMonthUpperDaysIndex = i % 2;
    yearCount += bsMonthData[i];
    if (totalYears <= yearCount) {
      if (
        (bsYear === 2085 && bsMonth === 5) ||
        (bsYear === 2088 && bsMonth === 5)
      ) {
        return SAMBAT_NUMBER_OF_DAYS[bsMonth - 1][bsMonthUpperDaysIndex] - 2;
      } else {
        return SAMBAT_NUMBER_OF_DAYS[bsMonth - 1][bsMonthUpperDaysIndex];
      }
    }
  }

  return 0;
};
