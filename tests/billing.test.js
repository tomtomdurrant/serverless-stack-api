import { calculateCost } from "../libs/billing-lib";

test('lowest tier', () => {
    const storage = 10;
    const expected = 4000;

    const sut = calculateCost(storage);

    expect(sut).toEqual(expected);
});

test('middle tier', () => {
    const storage = 100;
    const expected = 20000;

    const sut = calculateCost(storage);

    expect(sut).toEqual(expected);
});

test('top tier', () => {
    const storage = 101;
    const expected = 10100;

    const sut = calculateCost(storage);

    expect(sut).toEqual(expected);
});
