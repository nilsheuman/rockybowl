import { calculateScore } from "../src/score";
import { Frame } from "../src/types";

describe("score simple", () => {
    test("one roll, miss", () => {
        const rolls: Frame[] = [[0]];
        expect(calculateScore(0, rolls)).toBe(0);
    });

    test("two rolls, misses", () => {
        const rolls = [[0, 0]];
        expect(calculateScore(0, rolls)).toBe(0);
    });

    test("one roll, one pin", () => {
        const rolls = [[1]];
        expect(calculateScore(0, rolls)).toBe(1);
    });

    test("two rolls, one pin", () => {
        const rolls = [[1, 0]];
        expect(calculateScore(0, rolls)).toBe(1);
    });

    test("two rolls, three pins", () => {
        const rolls = [[1, 2]];
        expect(calculateScore(0, rolls)).toBe(3);
    });
});

describe("score spare", () => {
    test("one spare", () => {
        const rolls: Frame[] = [[3, 7]];
        expect(calculateScore(0, rolls)).toBe(10);
    });
    test("one spare, and one frame gives the next as extra", () => {
        const rolls: Frame[] = [
            [3, 7],
            [4, 2],
        ];
        expect(calculateScore(0, rolls)).toBe(3 + 7 + (4 + 2));
    });
});

describe("score strike", () => {
    test("one strike", () => {
        const rolls: Frame[] = [[10]];
        expect(calculateScore(0, rolls)).toBe(10);
    });
    test("one strike, and one frame gives the next as extra", () => {
        const rolls: Frame[] = [[10], [4, 2]];
        expect(calculateScore(0, rolls)).toBe(10 + (4 + 2));
    });
    test("one strike, and two frame gives the next two as extra", () => {
        const rolls: Frame[] = [[10], [4, 2], [5, 1]];
        expect(calculateScore(0, rolls)).toBe(10 + (4 + 2) + (5 + 1));
    });
});
