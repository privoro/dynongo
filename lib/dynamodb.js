"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require("aws-sdk");
const pick = require("object.pick");
const table_1 = require("./table");
const list_tables_1 = require("./methods/list-tables");
class DynamoDB {
    connect(options) {
        this.options = Object.assign({
            prefix: '',
            prefixDelimiter: '.',
            host: 'localhost',
            localPort: 8000
        }, options);
        AWS.config.update(pick(this.options, ['region', 'accessKeyId', 'secretAccessKey']));
        if (this.options.local) {
            this.raw = new AWS.DynamoDB({
                endpoint: `http://${this.options.host}:${this.options.localPort}`
            });
        }
        else {
            this.raw = new AWS.DynamoDB();
        }
        this.dynamodb = new AWS.DynamoDB.DocumentClient({
            service: this.raw
        });
    }
    get delimiter() {
        return this.options.prefixDelimiter;
    }
    get prefix() {
        return this.options.prefix;
    }
    table(name, options) {
        return new table_1.Table(name, this, options);
    }
    rawTable(name) {
        return new table_1.Table(name, this, { raw: true });
    }
    dropTable(name, options) {
        return this.table(name, options).drop();
    }
    dropRawTable(name) {
        return this.dropTable(name, { raw: true });
    }
    createTable(schema, options) {
        if (typeof schema !== 'object') {
            throw new TypeError(`Expected \`schema\` to be of type \`object\`, got \`${typeof schema}\``);
        }
        if (!schema.TableName) {
            throw new Error('Schema is missing a `TableName`');
        }
        return this.table(schema.TableName, options).create(schema);
    }
    createRawTable(schema) {
        return this.createTable(schema, { raw: true });
    }
    listTables() {
        return new list_tables_1.ListTables(this);
    }
}
exports.DynamoDB = DynamoDB;
