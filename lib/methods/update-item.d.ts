import { InsertItem } from './insert-item';
import { Executable } from './executable';
import { DynamoDB } from '../dynamodb';
import { Table } from '../table';
export declare class UpdateItem extends InsertItem implements Executable {
    constructor(table: Table, dynamodb: DynamoDB);
    where(condition: any): this;
    exec(): Promise<any>;
}
