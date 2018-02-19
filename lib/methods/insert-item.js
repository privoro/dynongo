"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pify = require("pify");
const queryUtil = require("../utils/query");
const updateUtil = require("../utils/update");
const method_1 = require("./method");
class InsertItem extends method_1.Method {
    constructor(table, dynamodb) {
        super(table, dynamodb);
        this.params.ReturnValues = 'ALL_NEW';
    }
    initialize(query, data) {
        this.params.Key = query;
        const parsedData = updateUtil.parse(data);
        this.params.UpdateExpression = parsedData.UpdateExpression;
        this.params.ExpressionAttributeNames = Object.assign({}, this.params.ExpressionAttributeNames, parsedData.ExpressionAttributeNames);
        this.params.ExpressionAttributeValues = Object.assign({}, this.params.ExpressionAttributeValues, parsedData.ExpressionAttributeValues);
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
        if (this.params.UpdateExpression === '') {
            delete this.params.UpdateExpression;
        }
        const parsedQuery = queryUtil.parse(this.params.Key);
        const params = this.params;
        params.TableName = this.table.name;
        params.ConditionExpression = `NOT (${parsedQuery.ConditionExpression})`;
        params.ExpressionAttributeNames = Object.assign({}, params.ExpressionAttributeNames, parsedQuery.ExpressionAttributeNames);
        params.ExpressionAttributeValues = Object.assign({}, params.ExpressionAttributeValues, parsedQuery.ExpressionAttributeValues);
        return pify(db.update.bind(db))(params)
            .then(data => {
            return this.rawResult === true ? data : data.Attributes;
        })
            .catch(err => {
            if (err.code === 'ConditionalCheckFailedException') {
                err.message = 'Duplicate key! A record with key `' + JSON.stringify(params.Key) + '` already exists.';
            }
            throw err;
        });
    }
    ;
}
exports.InsertItem = InsertItem;
