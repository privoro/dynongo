import { Method } from './method';
import { DynamoDB } from '../dynamodb';
import { Table } from '../table';
export declare abstract class BaseQuery extends Method {
    protected rawResult: boolean;
    constructor(table: Table, dynamodb: DynamoDB);
    initialize(query: any, indexName?: string): this;
    where(query: any): this;
    select(projection: string | undefined): this;
    startFrom(lastEvaluatedKey: any): this;
    limit(limit: number): this;
    count(): this;
    raw(): this;
}
