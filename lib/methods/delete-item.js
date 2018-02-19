"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pify = require("pify");
const method_1 = require("./method");
const queryUtil = require("../utils/query");
class DeleteItem extends method_1.Method {
    constructor(table, dynamodb) {
        super(table, dynamodb);
    }
    initialize(query, opts) {
        this.params.Key = query;
        if (opts && opts.result === true) {
            this.params.ReturnValues = 'ALL_OLD';
        }
        return this;
    }
    where(condition) {
        const parsedQuery = queryUtil.parse(condition, this.params.ExpressionAttributeValues);
        this.params.ConditionExpression = parsedQuery.ConditionExpression;
        this.params.ExpressionAttributeNames = Object.assign({}, this.params.ExpressionAttributeNames, parsedQuery.ExpressionAttributeNames);
        this.params.ExpressionAttributeValues = Object.assign({}, this.params.ExpressionAttributeValues, parsedQuery.ExpressionAttributeValues);
        return this;
    }
    raw() {
        this.rawResult = true;
        return this;
    }
    exec() {
        const db = this.dynamodb.dynamodb;
        if (!db) {
            return Promise.reject(new Error('Call .connect() before executing queries.'));
        }
        this.params.TableName = this.table.name;
        return pify(db.delete.bind(db))(this.params)
            .then(data => {
            if (this.params.ReturnValues === 'ALL_OLD') {
                return this.rawResult === true ? data : data.Attributes;
            }
        });
    }
    ;
}
exports.DeleteItem = DeleteItem;
