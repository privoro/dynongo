import { BaseQuery } from './base-query';
import { Executable } from './executable';
import { DynamoDB } from '../dynamodb';
import { Table } from '../table';
export declare class Query extends BaseQuery implements Executable {
    private error;
    constructor(table: Table, dynamodb: DynamoDB);
    sort(order: 1 | -1): this;
    exec(): Promise<any>;
}
