import { BowlingGame } from "../src/bowling-game";
import { sum } from "../src/utils";

describe("bowling simple", () => {
    test("one roll", () => {
        const noOfPins = 4;
        const bowlingGame = new BowlingGame();
        bowlingGame.roll(noOfPins);

        expect(bowlingGame.score()).toBe(noOfPins);
    });

    test("two rolls", () => {
        const noOfPins1 = 4;
        const noOfPins2 = 2;
        const bowlingGame = new BowlingGame();
        bowlingGame.roll(noOfPins1);
        bowlingGame.roll(noOfPins2);

        expect(bowlingGame.score()).toBe(noOfPins1 + noOfPins2);
    });

    test("two rounds of rolls two rolls", () => {
        const rolls = [4, 2, 1, 1];
        const bowlingGame = new BowlingGame();
        rolls.forEach((pins) => bowlingGame.roll(pins));

        expect(bowlingGame.score()).toBe(sum(rolls));
    });
});

describe("bowling spare", () => {
    test("first spare adds the next score", () => {
        const rolls = [4, 6, 1, 1];
        const bowlingGame = new BowlingGame();
        rolls.forEach((pins) => bowlingGame.roll(pins));

        // prettier-ignore
        expect(bowlingGame.score()).toBe(
            4 + 6 + // first frame
            1 + 1 + // second frame extra
            1 + 1   // second frame
        );
    });

    test("two spares add a third frame", () => {
        const rolls = [4, 6, 7, 3, 3, 1];
        const bowlingGame = new BowlingGame();
        rolls.forEach((pins) => bowlingGame.roll(pins));

        // prettier-ignore
        expect(bowlingGame.score()).toBe(
            4 + 6 + // first frame
            7 + 3 + // second frame extra
            7 + 3 + // second frame
            3 + 1 + // third frame extra
            3 + 1   // third frame
        );
    });

    test("one spare add next but not the next after that", () => {
        const rolls = [4, 6, 1, 1, 3, 3];
        const bowlingGame = new BowlingGame();
        rolls.forEach((pins) => bowlingGame.roll(pins));

        // prettier-ignore
        expect(bowlingGame.score()).toBe(
            4 + 6 + // first frame
            1 + 1 + // second frame extra
            1 + 1 + // second frame
            3 + 3   // third frame
        );
    });
});

describe("bowling strike", () => {
    test("first strike adds the next score", () => {
        const rolls = [4, 6, 1, 1];
        const bowlingGame = new BowlingGame();
        rolls.forEach((pins) => bowlingGame.roll(pins));

        // prettier-ignore
        expect(bowlingGame.score()).toBe(
            4 + 6 + // first frame
            1 + 1 + // second frame extra
            1 + 1   // second frame
        );
    });

    test("two strikes add a third frame", () => {
        const rolls = [10, 10, 3, 1];
        const bowlingGame = new BowlingGame();
        rolls.forEach((pins) => bowlingGame.roll(pins));

        // prettier-ignore
        expect(bowlingGame.score()).toBe(
            10 + // first frame
            10 + // second frame extra
            3 + 1 + // third frame extra
            10 + // second frame
            3 + 1 + // third frame extra
            3 + 1   // third frame
        );
    });

    test("one strike add next two", () => {
        const rolls = [10, 1, 1, 3, 3];
        const bowlingGame = new BowlingGame();
        rolls.forEach((pins) => bowlingGame.roll(pins));

        // prettier-ignore
        expect(bowlingGame.score()).toBe(
            10 + // first frame
            1 + 1 + // second frame extra
            3 + 3 + // third frame extra
            1 + 1 + // second frame
            3 + 3   // third frame
        );
    });
});

describe("bowling instruction", () => {
    test("first strike adds the next score", () => {
        const rolls = [4, 4];
        const bowlingGame = new BowlingGame();
        rolls.forEach((pins) => bowlingGame.roll(pins));

        // prettier-ignore
        expect(bowlingGame.score()).toBe(
            4 + 4 // first frame
        );
    });

    test("spare adds the next score", () => {
        const rolls = [4, 6, 5, 0];
        const bowlingGame = new BowlingGame();
        rolls.forEach((pins) => bowlingGame.roll(pins));

        // prettier-ignore
        expect(bowlingGame.score()).toBe(
            (4 + 6 + 5) + (5 + 0)
        );
    });

    test("strike adds the next score", () => {
        const rolls = [10, 5, 4];
        const bowlingGame = new BowlingGame();
        rolls.forEach((pins) => bowlingGame.roll(pins));

        // prettier-ignore
        expect(bowlingGame.score()).toBe(
            (10 + 5 + 4) + ( 5 + 4)
        );
    });
});
