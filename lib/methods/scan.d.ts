import { BaseQuery } from './base-query';
import { Executable } from './executable';
import { DynamoDB } from '../dynamodb';
import { Table } from '../table';
export declare class Scan extends BaseQuery implements Executable {
    constructor(table: Table, dynamodb: DynamoDB);
    exec(): Promise<any>;
}
