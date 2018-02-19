"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queryUtil = require("../utils/query");
const method_1 = require("./method");
class BaseQuery extends method_1.Method {
    constructor(table, dynamodb) {
        super(table, dynamodb);
    }
    initialize(query, indexName) {
        const parsedQuery = queryUtil.parse(query, this.params.ExpressionAttributeValues);
        this.params.KeyConditionExpression = parsedQuery.ConditionExpression;
        this.params.ExpressionAttributeNames = Object.assign({}, this.params.ExpressionAttributeNames, parsedQuery.ExpressionAttributeNames);
        this.params.ExpressionAttributeValues = Object.assign({}, this.params.ExpressionAttributeValues, parsedQuery.ExpressionAttributeValues);
        if (indexName) {
            this.params.IndexName = indexName;
        }
        return this;
    }
    ;
    where(query) {
        const parsedQuery = queryUtil.parse(query, this.params.ExpressionAttributeValues);
        this.params.FilterExpression = parsedQuery.ConditionExpression;
        this.params.ExpressionAttributeNames = Object.assign({}, this.params.ExpressionAttributeNames, parsedQuery.ExpressionAttributeNames);
        this.params.ExpressionAttributeValues = Object.assign({}, this.params.ExpressionAttributeValues, parsedQuery.ExpressionAttributeValues);
        return this;
    }
    select(projection) {
        if (!projection) {
            return this;
        }
        projection = projection.replace(/,? +/g, ',');
        const splittedProjection = projection.split(',');
        const expression = splittedProjection.map(p => `#k_${p}`).join(', ');
        const names = {};
        for (const token of splittedProjection) {
            names[`#k_${token}`] = token;
        }
        this.params.ProjectionExpression = expression;
        this.params.ExpressionAttributeNames = Object.assign({}, this.params.ExpressionAttributeNames, names);
        return this;
    }
    startFrom(lastEvaluatedKey) {
        this.params.ExclusiveStartKey = lastEvaluatedKey;
        return this;
    }
    limit(limit) {
        this.params.Limit = limit;
        return this;
    }
    count() {
        this.params.Select = 'COUNT';
        return this;
    }
    raw() {
        this.rawResult = true;
        return this;
    }
}
exports.BaseQuery = BaseQuery;
