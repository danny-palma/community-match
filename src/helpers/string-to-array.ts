import { parse } from "string-array";

export function convertStringToArray(stringToConvert: string | Array<any>): Array<any> {
    if (Array.isArray(stringToConvert)) return stringToConvert.map(value => {
        try {
            return JSON.parse(value);
        } catch (err) {
            return value
        }
    });
    return parse(stringToConvert).array.map(value => {
        try {
            return JSON.parse(value);
        } catch (err) {
            return value
        }
    });
}
