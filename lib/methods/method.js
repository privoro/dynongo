"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Method {
    constructor(table, dynamodb) {
        this.table = table;
        this.dynamodb = dynamodb;
        this.params = {};
    }
}
exports.Method = Method;
