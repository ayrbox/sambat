import { totalDaysTillDate, convertBStoAD } from "./index";

describe("testing main func", () => {
  it("should", () => {
    const r = totalDaysTillDate(2078, 3, 12);
    expect(typeof r).toBe("number");
  });

  it("should test first year", () => {
    const r = totalDaysTillDate(1970, 10, 1);
    expect(typeof r).toBe("number");
  });

  it("should correctly convert bs date to ad date", () => {
    expect(convertBStoAD(2076, 3, 8)).toEqual(new Date(2019, 5, 23));
    expect(convertBStoAD(2075, 4, 1)).toEqual(new Date(2018, 6, 17));
    expect(convertBStoAD(2075, 5, 7)).toEqual(new Date(2018, 7, 23));
    expect(convertBStoAD(2075, 7, 19)).toEqual(new Date(2018, 10, 5));
    expect(convertBStoAD(2075, 11, 1)).toEqual(new Date(2019, 1, 13));
    expect(convertBStoAD(2076, 1, 23)).toEqual(new Date(2019, 4, 6));
    expect(convertBStoAD(2076, 2, 29)).toEqual(new Date(2019, 5, 12));
    expect(convertBStoAD(2083, 6, 16)).toEqual(new Date(2026, 9, 2));
    expect(convertBStoAD(2087, 8, 18)).toEqual(new Date(2030, 11, 4));
    expect(convertBStoAD(2073, 12, 31)).toEqual(new Date(2017, 3, 13));
  });
});
