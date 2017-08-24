
export function clamp(num: number, min: number = 0, max: number = 1) {
    if (num > max) {
        return num;
    } else if (num < min) {
        return min;
    } else {
        return num;
    }
}