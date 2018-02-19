import { UpdateQuery } from '../types/update-query';
import { Map } from '../types/map';
export interface ParseResult {
    UpdateExpression: string;
    ExpressionAttributeNames: Map<string>;
    ExpressionAttributeValues: Map<any>;
}
export declare const operators: string[];
export declare function parse(query: UpdateQuery): ParseResult;
