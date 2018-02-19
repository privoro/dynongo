"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pify = require("pify");
const base_query_1 = require("./base-query");
class Query extends base_query_1.BaseQuery {
    constructor(table, dynamodb) {
        super(table, dynamodb);
    }
    sort(order) {
        if (order !== 1 && order !== -1) {
            this.error = new Error('Provided sort argument is incorrect. Use 1 for ascending and -1 for descending order.');
        }
        else {
            this.params.ScanIndexForward = order === 1;
        }
        return this;
    }
    exec() {
        if (this.error) {
            return Promise.reject(this.error);
        }
        const db = this.dynamodb.dynamodb;
        const limit = this.params.Limit;
        if (!db) {
            return Promise.reject(new Error('Call .connect() before executing queries.'));
        }
        this.params.TableName = this.table.name;
        if (limit === 1 && this.params.FilterExpression) {
            delete this.params.Limit;
        }
        if (Object.keys(this.params.ExpressionAttributeValues).length < 1) {
            delete this.params.ExpressionAttributeValues;
        }
        return pify(db.query.bind(db))(this.params)
            .then(data => {
            if (this.params.Select === 'COUNT') {
                return data.Count || 0;
            }
            if (limit === 1) {
                if (this.rawResult === true) {
                    data.Items = [data.Items[0]];
                    return data;
                }
                return data.Items[0];
            }
            return this.rawResult === true ? data : data.Items;
        });
    }
    ;
}
exports.Query = Query;
