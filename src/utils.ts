export const sum = (numbers: number[]) =>
    numbers.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    }, 0);
