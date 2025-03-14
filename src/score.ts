import {
    TOTAL_PINS,
    Frame,
    NamedRolls,
    EXTRA_ROLLS_FOR_STRIKE,
    EXTRA_ROLLS_FOR_SPARE,
} from "./types";
import { sum } from "./utils";

export const getNamedRolls = (frame: number[]): NamedRolls => {
    const first = frame[0] || 0;
    const second = frame[1] || 0;
    return { first, second };
};

export const isStrike = (frame: number[]): boolean => {
    const { first } = getNamedRolls(frame);
    return first == TOTAL_PINS;
};

export const isSpare = (frame: number[]): boolean => {
    const { first, second } = getNamedRolls(frame);
    return first !== TOTAL_PINS && first + second === TOTAL_PINS;
};

export const getNextRolls = (
    index: number,
    frames: Frame[],
    numRolls: number
): number[] => {
    const nextFrame = frames[index + 1] || [];
    const secondNextFrame = frames[index + 2] || [];
    return nextFrame.concat(secondNextFrame).slice(0, numRolls);
};

export function calculateScore(index: number, frames: Frame[]): number {
    const frame = frames[index];
    if (!frame) {
        return 0;
    }
    let score = sum(frame);
    if (isStrike(frame)) {
        score += sum(getNextRolls(index, frames, EXTRA_ROLLS_FOR_STRIKE));
    } else if (isSpare(frame)) {
        score += sum(getNextRolls(index, frames, EXTRA_ROLLS_FOR_SPARE));
    }
    return score;
}
