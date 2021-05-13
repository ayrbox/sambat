import { totalDaysTillDate, convertToAD } from "./index";

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
});
