import { Method } from './method';
import { Executable } from './executable';
import { DynamoDB } from '../dynamodb';
import { Table } from '../table';
export declare class DeleteTable extends Method implements Executable {
    private shouldWait;
    private waitMs;
    constructor(table: Table, dynamodb: DynamoDB);
    wait(ms?: number): this;
    exec(): Promise<void>;
    private poll();
    private pollHelper();
}
