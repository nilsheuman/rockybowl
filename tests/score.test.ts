import { calculateScore, getNamedRolls, isSpare, isStrike } from "../src/score";
import { Frame } from "../src/types";

describe("get rolls", () => {
    test("no rolls gives first and second 0", () => {
        const { first, second } = getNamedRolls([]);
        expect(first).toBe(0);
        expect(second).toBe(0);
    });
    test("one roll gives first the value and second 0", () => {
        const { first, second } = getNamedRolls([1]);
        expect(first).toBe(1);
        expect(second).toBe(0);
    });
    test("two rolls gives first the value and second value", () => {
        const { first, second } = getNamedRolls([1, 2]);
        expect(first).toBe(1);
        expect(second).toBe(2);
    });
    test("three rolls gives first the value and second value", () => {
        const { first, second } = getNamedRolls([1, 2, 3]);
        expect(first).toBe(1);
        expect(second).toBe(2);
    });
});

describe("is strike", () => {
    test("no rolls is no strike", () => {
        expect(isStrike([])).toBe(false);
    });
    test("one roll not a strike", () => {
        expect(isStrike([9])).toBe(false);
    });
    test("two low rolls is not a strike", () => {
        expect(isStrike([1, 2])).toBe(false);
    });
    test("spare is not a strike", () => {
        expect(isStrike([4, 6])).toBe(false);
    });
    test("10 is a strike", () => {
        expect(isStrike([10])).toBe(true);
    });
    test("10 and another roll is still a strike", () => {
        expect(isStrike([10, 3])).toBe(true);
    });
});

describe("is spare", () => {
    test("no rolls is not a spare", () => {
        expect(isSpare([])).toBe(false);
    });
    test("one roll is not a spare", () => {
        expect(isSpare([9])).toBe(false);
    });
    test("two low rolls is not a spare", () => {
        expect(isSpare([1, 2])).toBe(false);
    });
    test("a total of 10 is a spare", () => {
        expect(isSpare([4, 6])).toBe(true);
    });
    test("10 is not a spare since it is a strike", () => {
        expect(isSpare([10])).toBe(false);
    });
    test("10 and another roll is not a spare since it is a strike", () => {
        expect(isSpare([10, 3])).toBe(false);
    });
});

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
    test("one spare, and one frame gives the next roll as extra", () => {
        const rolls: Frame[] = [
            [3, 7],
            [4, 2],
        ];
        expect(calculateScore(0, rolls)).toBe(3 + 7 + 4);
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
    test("one strike, and two frames gives the next two rolls as extra", () => {
        const rolls: Frame[] = [[10], [4, 2], [5, 1]];
        expect(calculateScore(0, rolls)).toBe(10 + (4 + 2));
    });
});

describe("score bad actors", () => {
    test("no rolls gives 0", () => {
        const rolls: Frame[] = [];
        expect(calculateScore(0, rolls)).toBe(0);
    });
});
