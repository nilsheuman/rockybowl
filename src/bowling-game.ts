import { calculateScore } from "./score";
import { Frame, PINS } from "./types";
import { sum } from "./utils";

export class BowlingGame {
    private currentRoll = 0;
    private currentFrame = 0;
    private frames: Frame[] = [];

    roll(noOfPins: number) {
        if (this.currentRoll == 0) {
            this.frames.push([noOfPins]);
        } else {
            this.frames[this.currentFrame].push(noOfPins);
        }
        this.currentRoll++;
        // should move to next round if
        // - second roll done
        // - we got a strike
        if (this.currentRoll == 2 || noOfPins == PINS) {
            this.currentRoll = 0;
            this.currentFrame++;
        }
    }

    score() {
        const scores = [];
        for (let i = 0; i < this.frames.length; i++) {
            scores.push(calculateScore(i, this.frames));
        }
        const score = sum(scores);
        return score;
    }
}
