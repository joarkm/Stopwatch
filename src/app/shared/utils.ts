export function floatStringModulo(num: string, decimals = 0, modulo = 60): string {
    let next;
    const parts = num.split('.');
    const whole = parseInt(parts[0], 10) % modulo;
    const base = Math.pow(10, decimals);
    const dec = parseInt(parts[1], 10);

    // TODO: See if these calculations can be optimized and/or simplified
    let newDec: string | number;
    let newWhole = whole;
    if (dec) {
        newDec = (dec + base - 1) % base;
    } else {
        newDec = '9'.repeat(decimals);
    }

    if (parseInt('' + newDec, 10) === parseInt('9'.repeat(decimals), 10)) {
        if (whole) {
            newWhole = whole - 1;
        } else {
            newWhole = 59;
        }
    }

    newDec = newDec.toString().padStart(decimals, '0');
    next = `${newWhole}.${newDec}`;
    return decimals > 0 ?  next : next.split('.')[0];
}

export function padWholeWithZeroes(num: string | number, decimals = 1): string {
    const whole = num;
    const dec = '0'.repeat(decimals);
    return `${whole}.${dec}`;
}
