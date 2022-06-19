export function percent(partialValue: number | undefined, totalValue: number | undefined) {
    if (partialValue === undefined || totalValue === undefined) return 0;
    return (100 * partialValue) / totalValue;
 }