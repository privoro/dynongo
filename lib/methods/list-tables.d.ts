import { DynamoDB } from '../dynamodb';
import { Executable } from './executable';
import { Method } from './method';
export declare class ListTables extends Method implements Executable {
    constructor(dynamodb: DynamoDB);
    exec(): Promise<string[]>;
    private execHelper(result?, params?);
}
