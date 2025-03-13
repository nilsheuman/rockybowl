import { PINS, Frame } from "./types";
import { sum } from "./utils";

export function calculateScore(index: number, frames: Frame[]) {
    const first = frames[index][0] || 0;
    const second = frames[index][1] || 0;
    let score = first + second;
    if (first == PINS) {
        // strike, add two next frames
        if (frames[index + 1]) {
            score += sum(frames[index + 1]);
        }
        if (frames[index + 2]) {
            score += sum(frames[index + 2]);
        }
    } else if (first + second == PINS) {
        // spare, add next frame
        if (frames[index + 1]) {
            score += sum(frames[index + 1]);
        }
    }
    return score;
}
