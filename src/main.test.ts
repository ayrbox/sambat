import { convertToAD } from "./convertToAD";
import { convertToSambat, getBsMonthDays } from "./convertToBS";

describe("testing main func", () => {
  it("should correctly convert bs date to ad date", () => {
    expect(convertToAD(2076, 3, 8)).toEqual(new Date(2019, 5, 23));
    expect(convertToAD(2075, 4, 1)).toEqual(new Date(2018, 6, 17));
    expect(convertToAD(2075, 5, 7)).toEqual(new Date(2018, 7, 23));
    expect(convertToAD(2075, 7, 19)).toEqual(new Date(2018, 10, 5));
    expect(convertToAD(2075, 11, 1)).toEqual(new Date(2019, 1, 13));
    expect(convertToAD(2076, 1, 23)).toEqual(new Date(2019, 4, 6));
    expect(convertToAD(2076, 2, 29)).toEqual(new Date(2019, 5, 12));
    expect(convertToAD(2083, 6, 16)).toEqual(new Date(2026, 9, 2));
    expect(convertToAD(2087, 8, 18)).toEqual(new Date(2030, 11, 4));
    expect(convertToAD(2073, 12, 31)).toEqual(new Date(2017, 3, 13));
  });

  it("should get correct number of days for a given bs month", () => {
    expect(getBsMonthDays(2075, 3)).toBe(32);
    expect(getBsMonthDays(2078, 6)).toBe(31);
    expect(getBsMonthDays(2067, 8)).toBe(29);
    expect(getBsMonthDays(2046, 9)).toBe(29);
    expect(getBsMonthDays(2074, 2)).toBe(31);
    expect(getBsMonthDays(2076, 7)).toBe(30);
    expect(getBsMonthDays(2075, 1)).toBe(31);
    expect(getBsMonthDays(2077, 5)).toBe(31);
  });

  it("should correctly convert ad date to bs date", () => {
    expect(convertToSambat(2018, 7, 7)).toEqual({
      date: 23,
      month: 3,
      year: 2075,
    });
    expect(convertToSambat(2018, 8, 18)).toEqual({
      date: 2,
      month: 5,
      year: 2075,
    });
    expect(convertToSambat(2018, 9, 10)).toEqual({
      date: 25,
      month: 5,
      year: 2075,
    });
    expect(convertToSambat(2018, 12, 30)).toEqual({
      date: 15,
      month: 9,
      year: 2075,
    });
    expect(convertToSambat(2019, 1, 1)).toEqual({
      date: 17,
      month: 9,
      year: 2075,
    });
    expect(convertToSambat(2019, 6, 23)).toEqual({
      date: 8,
      month: 3,
      year: 2076,
    });
    expect(convertToSambat(2025, 9, 11)).toEqual({
      date: 26,
      month: 5,
      year: 2082,
    });
    expect(convertToSambat(2028, 3, 13)).toEqual({
      date: 30,
      month: 11,
      year: 2084,
    });
    expect(convertToSambat(2017, 4, 13)).toEqual({
      date: 31,
      month: 12,
      year: 2073,
    });
  });
});
