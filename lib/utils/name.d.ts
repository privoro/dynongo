import { Map } from '../types/map';
export interface KeyNameResult {
    Expression: string;
    ExpressionAttributeNames: Map<string>;
}
export interface ValueNameResult {
    Expression: string | string[];
    ExpressionAttributeValues: Map<any>;
}
export declare function generateKeyName(key: string): KeyNameResult;
export declare function generateValueName(key: string, value: any, values?: {
    [key: string]: any;
}, raw?: boolean): ValueNameResult;
