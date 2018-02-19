"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pify = require("pify");
const queryUtil = require("../utils/query");
const insert_item_1 = require("./insert-item");
class UpdateItem extends insert_item_1.InsertItem {
    constructor(table, dynamodb) {
        super(table, dynamodb);
    }
    where(condition) {
        const parsedQuery = queryUtil.parse(condition, this.params.ExpressionAttributeValues);
        if (this.params.ConditionExpression) {
            this.params.ConditionExpression = `(${this.params.ConditionExpression}) AND (${parsedQuery.ConditionExpression})`;
        }
        else {
            this.params.ConditionExpression = parsedQuery.ConditionExpression;
        }
        this.params.ExpressionAttributeNames = Object.assign({}, this.params.ExpressionAttributeNames, parsedQuery.ExpressionAttributeNames);
        this.params.ExpressionAttributeValues = Object.assign({}, this.params.ExpressionAttributeValues, parsedQuery.ExpressionAttributeValues);
        return this;
    }
    exec() {
        const db = this.dynamodb.dynamodb;
        if (!db) {
            return Promise.reject(new Error('Call .connect() before executing queries.'));
        }
        this.params.TableName = this.table.name;
        return pify(db.update.bind(db), Promise)(this.params)
            .then(data => {
            return this.rawResult === true ? data : data.Attributes;
        });
    }
}
exports.UpdateItem = UpdateItem;
