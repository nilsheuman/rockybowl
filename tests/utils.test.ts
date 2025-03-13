import { BowlingGame } from "../src/bowling-game";
import { sum } from "../src/utils";

describe("sum", () => {
    test("one item", () => {
        const list = [4];
        expect(sum(list)).toBe(4);
    });

    test("two items", () => {
        const list = [4, 5];
        expect(sum(list)).toBe(9);
    });

    test("two items, and one negative", () => {
        const list = [4, 5, -3];
        expect(sum(list)).toBe(6);
    });
});
