export function padWholeWithZeroes(num: string | number, decimals = 1): string {
    const whole = num;
    const dec = '0'.repeat(decimals);
    return `${whole}.${dec}`;
}

export function toFractionSecond(currentSecond: number, decimals: number): number {
    const base = Math.pow(10, decimals);
    return currentSecond / base;
}
