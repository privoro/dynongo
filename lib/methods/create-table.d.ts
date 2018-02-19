import { Method } from './method';
import { Executable } from './executable';
import { Schema } from '../types/schema';
import { DynamoDB } from '../dynamodb';
import { Table } from '../table';
export declare class CreateTable extends Method implements Executable {
    private shouldWait;
    private waitMs;
    private schema;
    constructor(table: Table, dynamodb: DynamoDB);
    initialize(schema: Schema): this;
    wait(ms?: number): this;
    exec(): Promise<void>;
    private poll();
    private pollHelper();
}
