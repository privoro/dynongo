import { Method } from './method';
import { Executable } from './executable';
import { DynamoDB } from '../dynamodb';
import { Table } from '../table';
export declare class DeleteItem extends Method implements Executable {
    private rawResult;
    constructor(table: Table, dynamodb: DynamoDB);
    initialize(query: any, opts?: {
        result: boolean;
    }): this;
    where(condition: any): this;
    raw(): this;
    exec(): Promise<any>;
}
