export const TOTAL_PINS = 10;
export const FRAMES_PER_GAME = 10;
export const ROLLS_PER_FRAME = 2;
export const EXTRA_ROLLS_FOR_SPARE = 1;
export const EXTRA_ROLLS_FOR_STRIKE = 2;

export type Frame = number[];

export type NamedRolls = {
    first: number;
    second: number;
};
