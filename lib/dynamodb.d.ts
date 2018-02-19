import * as AWS from 'aws-sdk';
import { Table, TableOptions } from './table';
import { ListTables } from './methods/list-tables';
import { Schema } from './types/schema';
import { DeleteTable } from './methods/delete-table';
import { CreateTable } from './methods/create-table';
export interface Options {
    local?: boolean;
    host?: string;
    localPort?: number;
    prefix?: string;
    prefixDelimiter?: string;
    region?: string;
    accessKeyId?: string;
    secretAccessKey?: string;
}
export declare class DynamoDB {
    raw: AWS.DynamoDB;
    dynamodb: AWS.DynamoDB.DocumentClient;
    private options;
    connect(options?: Options): void;
    readonly delimiter: string;
    readonly prefix: string;
    table(name: string, options?: TableOptions): Table;
    rawTable(name: string): Table;
    dropTable(name: string, options?: TableOptions): DeleteTable;
    dropRawTable(name: string): DeleteTable;
    createTable(schema: Schema, options?: TableOptions): CreateTable;
    createRawTable(schema: Schema): CreateTable;
    listTables(): ListTables;
}
