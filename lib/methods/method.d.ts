import { DynamoDB } from '../dynamodb';
import { Table } from '../table';
import { Params } from '../types/params';
export declare abstract class Method {
    protected table: Table;
    protected dynamodb: DynamoDB;
    protected params: Params;
    constructor(table: Table, dynamodb: DynamoDB);
}
