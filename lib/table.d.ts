import { DynamoDB } from './dynamodb';
import { Query } from './methods/query';
import { Scan } from './methods/scan';
import { InsertItem } from './methods/insert-item';
import { UpdateItem } from './methods/update-item';
import { DeleteItem } from './methods/delete-item';
import { DeleteTable } from './methods/delete-table';
import { CreateTable } from './methods/create-table';
import { Map } from './types/map';
import { Schema } from './types/schema';
export interface TableOptions {
    raw?: boolean;
}
export declare class Table {
    private tableName;
    private dynamodb;
    private options;
    constructor(tableName: string, dynamodb: DynamoDB, options: TableOptions);
    readonly name: string;
    find(): Scan;
    find(query: any, indexName?: string): Query;
    findOne(query?: any, indexName?: string): Query;
    findOneAndRemove(query: any): DeleteItem;
    insert(key: Map<string | number>, data?: any): InsertItem;
    update(key: any, data: any, options?: any): UpdateItem;
    upsert(key: any, data: any): UpdateItem;
    remove(query: any): DeleteItem;
    drop(): DeleteTable;
    create(schema: Schema): CreateTable;
}
