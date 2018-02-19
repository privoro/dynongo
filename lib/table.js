"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("./methods/query");
const scan_1 = require("./methods/scan");
const insert_item_1 = require("./methods/insert-item");
const update_item_1 = require("./methods/update-item");
const delete_item_1 = require("./methods/delete-item");
const delete_table_1 = require("./methods/delete-table");
const create_table_1 = require("./methods/create-table");
const table = require("./utils/table");
const update_1 = require("./utils/update");
class Table {
    constructor(tableName, dynamodb, options) {
        this.tableName = tableName;
        this.dynamodb = dynamodb;
        this.options = Object.assign({
            raw: false
        }, options);
    }
    get name() {
        if (this.options.raw === true) {
            return this.tableName;
        }
        return table.lookupName(this.tableName, this.dynamodb);
    }
    find(query, indexName) {
        if (query === undefined) {
            return new scan_1.Scan(this, this.dynamodb);
        }
        const qry = new query_1.Query(this, this.dynamodb);
        return qry.initialize(query, indexName);
    }
    ;
    findOne(query, indexName) {
        return this.find(query, indexName).limit(1);
    }
    findOneAndRemove(query) {
        const del = new delete_item_1.DeleteItem(this, this.dynamodb);
        return del.initialize(query, { result: true });
    }
    ;
    insert(key, data) {
        const put = new insert_item_1.InsertItem(this, this.dynamodb);
        return put.initialize(key, { $set: data });
    }
    update(key, data, options) {
        options = options || {};
        const update = new update_item_1.UpdateItem(this, this.dynamodb);
        if (options.upsert && options.upsert === true) {
            const params = Object.create(null);
            for (const key of Object.keys(data)) {
                if (update_1.operators.indexOf(key) !== -1) {
                    params[key] = data[key];
                    delete data[key];
                }
            }
            params['$set'] = Object.assign({}, params['$set'], data);
            return update.initialize(key, params);
        }
        return update.initialize(key, data).where(key);
    }
    upsert(key, data) {
        return this.update(key, data, { upsert: true });
    }
    remove(query) {
        const del = new delete_item_1.DeleteItem(this, this.dynamodb);
        return del.initialize(query);
    }
    drop() {
        return new delete_table_1.DeleteTable(this, this.dynamodb);
    }
    create(schema) {
        if (typeof schema !== 'object') {
            throw new TypeError(`Expected \`schema\` to be of type \`object\`, got \`${typeof schema}\``);
        }
        return new create_table_1.CreateTable(this, this.dynamodb).initialize(schema);
    }
}
exports.Table = Table;
