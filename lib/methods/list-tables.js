"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pify = require("pify");
const method_1 = require("./method");
class ListTables extends method_1.Method {
    constructor(dynamodb) {
        super(null, dynamodb);
    }
    exec() {
        if (!this.dynamodb.raw) {
            return Promise.reject(new Error('Call .connect() before executing queries.'));
        }
        return this.execHelper();
    }
    execHelper(result, params) {
        result = result || [];
        params = params || {};
        const db = this.dynamodb.raw;
        const prefix = this.dynamodb.prefix;
        return pify(db.listTables.bind(db))(params)
            .then(data => {
            result = result.concat(data.TableNames);
            if (data.LastEvaluatedTableName) {
                params.ExclusiveStartTableName = data.LastEvaluatedTableName;
                return this.execHelper(result, params);
            }
            return prefix === undefined ? result : result.filter(table => table.indexOf(prefix) === 0);
        });
    }
}
exports.ListTables = ListTables;
