import { Executable } from './executable';
import { Method } from './method';
import { DynamoDB } from '../dynamodb';
import { Table } from '../table';
import { UpdateQuery } from '../types/update-query';
export declare class InsertItem extends Method implements Executable {
    protected rawResult: boolean;
    constructor(table: Table, dynamodb: DynamoDB);
    initialize(query: any, data: UpdateQuery): this;
    raw(): this;
    exec(): Promise<any>;
}
