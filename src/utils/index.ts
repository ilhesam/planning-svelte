import moment from "moment";

export function percent(partialValue: number, totalValue: number) {
    return ((100 * partialValue) / totalValue).toFixed(2);
 }

 export function remainDays(date: Date) {
    var result = moment(date).diff(moment(), "days") + 1;
    if (result < 0) return 0
    else return result
 }

 export function formatDate(date: Date) {
    return moment(date).format("YYYY-MM-DD")
 }