import { calculateScore, isSpare, isStrike } from "./score";
import {
    EXTRA_ROLLS_FOR_SPARE,
    EXTRA_ROLLS_FOR_STRIKE,
    Frame,
    FRAMES_PER_GAME,
    ROLLS_PER_FRAME,
} from "./types";
import { sum } from "./utils";

export class BowlingGame {
    private currentRoll = 0;
    private currentFrame = 0;
    private frames: Frame[] = [];
    private numFrames = FRAMES_PER_GAME;
    private numRolls = ROLLS_PER_FRAME;
    private scores: number[] = [];
    private totalScore = 0;

    roll(noOfPins: number) {
        const isGameFinished = this.currentFrame === this.numFrames;
        const isLastFrame = this.currentFrame === FRAMES_PER_GAME - 1;
        const isFirstRollOfFrame = this.currentRoll === 0;
        const isSecondRollOfFrame = this.currentRoll === 1;

        if (isGameFinished) {
            return;
        }

        if (isFirstRollOfFrame) {
            this.frames.push([noOfPins]);
        } else {
            this.frames[this.currentFrame].push(noOfPins);
        }
        const frame = this.frames[this.currentFrame];

        // * In the last frame, if the bowler bowls a spare, they get another bowl. The score of this frame is the sum of the three bowls.
        // * In the last frame, if the bowler bowls a strike, they get another 2 bowls. The score of this frame is the sum of the three bowls
        if (isLastFrame) {
            if (isFirstRollOfFrame && isStrike(frame)) {
                this.numRolls += EXTRA_ROLLS_FOR_STRIKE;
            } else if (isSecondRollOfFrame && isSpare(frame)) {
                this.numRolls += EXTRA_ROLLS_FOR_SPARE;
            }
        }

        this.currentRoll++;
        const isLastRollOfFrame = this.currentRoll === this.numRolls;

        // should move to next round if
        // - last roll for the frame done
        // - we got a strike, but not on the last frame
        if (isLastRollOfFrame || (!isLastFrame && isStrike(frame))) {
            this.currentRoll = 0;
            this.currentFrame++;
        }
    }

    score() {
        this.scores = [];
        for (let i = 0; i < this.frames.length; i++) {
            this.scores.push(calculateScore(i, this.frames));
        }
        this.totalScore = sum(this.scores);
        return this.totalScore;
    }
}
