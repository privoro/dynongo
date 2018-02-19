"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pify = require("pify");
const base_query_1 = require("./base-query");
class Scan extends base_query_1.BaseQuery {
    constructor(table, dynamodb) {
        super(table, dynamodb);
    }
    exec() {
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
        return pify(db.scan.bind(db))(this.params)
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
exports.Scan = Scan;
