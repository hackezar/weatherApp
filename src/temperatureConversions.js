export function kelvinToFarenheight(kTemp) {
    return 1.8 * (kTemp - 273) + 32;
}

export function metersPerSecondToMilesPerHour(mps) {
    return (mps * 2.237).toFixed(0);
}