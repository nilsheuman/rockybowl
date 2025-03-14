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
    test("first spare adds the next roll", () => {
        const rolls = [4, 6, 1, 1];
        const bowlingGame = new BowlingGame();
        rolls.forEach((pins) => bowlingGame.roll(pins));

        // prettier-ignore
        expect(bowlingGame.score()).toBe(
            4 + 6 + // first frame (spare)
            1 +     // add first roll of second frame
            1 + 1   // second frame
        );
    });

    test("two spares add a third frame", () => {
        const rolls = [4, 6, 7, 3, 3, 1];
        const bowlingGame = new BowlingGame();
        rolls.forEach((pins) => bowlingGame.roll(pins));

        // prettier-ignore
        expect(bowlingGame.score()).toBe(
            4 + 6 + // first frame (spare)
            7 +     // add first roll of second frame
            7 + 3 + // second frame (spare)
            3 +     // add first roll of third frame
            3 + 1   // third frame
        );
    });

    test("one spare add next but not the next after that", () => {
        const rolls = [4, 6, 1, 1, 3, 3];
        const bowlingGame = new BowlingGame();
        rolls.forEach((pins) => bowlingGame.roll(pins));

        // prettier-ignore
        expect(bowlingGame.score()).toBe(
            4 + 6 + // first frame (spare)
            1 +     // add first roll of second frame
            1 + 1 + // second frame
            3 + 3   // third frame
        );
    });
});

describe("bowling strike", () => {
    test("first strike adds the next score", () => {
        const rolls = [10, 1, 1];
        const bowlingGame = new BowlingGame();
        rolls.forEach((pins) => bowlingGame.roll(pins));

        // prettier-ignore
        expect(bowlingGame.score()).toBe(
            10 +    // first frame
            1 + 1 + // add both rolls of second frame
            1 + 1   // second frame
        );
    });

    test("two strikes add a third frame", () => {
        const rolls = [10, 10, 3, 1];
        const bowlingGame = new BowlingGame();
        rolls.forEach((pins) => bowlingGame.roll(pins));

        // prettier-ignore
        expect(bowlingGame.score()).toBe(
            10 +    // first frame (strike)
            10 +    // add roll from second frame
            3 +     // add roll from third frame
            10 +    // second frame (strike)
            3 + 1 + // add both rolls from third frame
            3 + 1   // third frame
        );
    });

    test("one strike add next two", () => {
        const rolls = [10, 1, 1, 3, 3];
        const bowlingGame = new BowlingGame();
        rolls.forEach((pins) => bowlingGame.roll(pins));

        // prettier-ignore
        expect(bowlingGame.score()).toBe(
            10 +    // first frame (strike)
            1 + 1 + // add both rolls from second frame
            1 + 1 + // second frame
            3 + 3   // third frame
        );
    });
});

describe("bowling instruction", () => {
    test("two rolls the sum of the rolls", () => {
        const rolls = [4, 4];
        const bowlingGame = new BowlingGame();
        rolls.forEach((pins) => bowlingGame.roll(pins));

        expect(bowlingGame.score()).toBe(4 + 4);
    });

    test("spare adds the next roll", () => {
        const rolls = [4, 6, 5, 0];
        const bowlingGame = new BowlingGame();
        rolls.forEach((pins) => bowlingGame.roll(pins));

        // prettier-ignore
        expect(bowlingGame.score()).toBe(
            // note: misleading example to show (5 + 0) since
            // the 0 should not be counted in a spare
            (4 + 6 + 5) + (5 + 0)
        );
    });

    test("strike adds the next two rolls", () => {
        const rolls = [10, 5, 4];
        const bowlingGame = new BowlingGame();
        rolls.forEach((pins) => bowlingGame.roll(pins));

        // prettier-ignore
        expect(bowlingGame.score()).toBe(
            (10 + 5 + 4) + ( 5 + 4)
        );
    });
});

describe("game length", () => {
    test("10 frames should give score of 10 frames", () => {
        // prettier-ignore
        const rolls = [
            5, 0, 5, 0, 5, 0, 5, 0, 5, 0,
            5, 0, 5, 0, 5, 0, 5, 0, 5, 0,
        ];
        const bowlingGame = new BowlingGame();
        rolls.forEach((pins) => bowlingGame.roll(pins));

        expect(bowlingGame.score()).toBe(5 * 10);
    });

    test("11 frames should give score of 10 frames", () => {
        // prettier-ignore
        const rolls = [
            5, 0, 5, 0, 5, 0, 5, 0, 5, 0,
            5, 0, 5, 0, 5, 0, 5, 0, 5, 0,
            5, 0,
        ];
        const bowlingGame = new BowlingGame();
        rolls.forEach((pins) => bowlingGame.roll(pins));

        expect(bowlingGame.score()).toBe(5 * 10);
    });

    test("spare on last round should give one extra roll", () => {
        // prettier-ignore
        const rolls = [
            5, 0, 5, 0, 5, 0, 5, 0, 5, 0,
            5, 0, 5, 0, 5, 0, 5, 0, 5, 5,
            5,
        ];
        const bowlingGame = new BowlingGame();
        rolls.forEach((pins) => bowlingGame.roll(pins));

        expect(bowlingGame.score()).toBe(5 * 10 + 2 * 5);
    });

    test("strike on last round should give two extra rolls", () => {
        // prettier-ignore
        const rolls = [
            5, 0, 5, 0, 5, 0, 5, 0, 5, 0,
            5, 0, 5, 0, 5, 0, 5, 0, 10,
            5, 5,
        ];
        const bowlingGame = new BowlingGame();
        rolls.forEach((pins) => bowlingGame.roll(pins));

        expect(bowlingGame.score()).toBe(5 * 9 + 10 + 2 * 5);
    });

    test("all strikes gives two extra rolls and total 300", () => {
        // prettier-ignore
        const rolls = [
            10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
            10, 10];
        const bowlingGame = new BowlingGame();
        rolls.forEach((pins) => bowlingGame.roll(pins));

        expect(bowlingGame.score()).toBe(300);
    });
});
