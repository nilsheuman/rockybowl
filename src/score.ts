import { PINS, Frame } from "./types";
import { sum } from "./utils";

export function calculateScore(index: number, rolls: Frame[]) {
    const first = rolls[index][0] || 0;
    const second = rolls[index][1] || 0;
    let score = first + second;
    if (first == PINS) {
        // strike, add two next frames
        if (rolls[index + 1]) {
            score += sum(rolls[index + 1]);
        }
        if (rolls[index + 2]) {
            score += sum(rolls[index + 2]);
        }
    } else if (first + second == PINS) {
        // spare, add next frame
        if (rolls[index + 1]) {
            score += sum(rolls[index + 1]);
        }
    }
    return score;
}
