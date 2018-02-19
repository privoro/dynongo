"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function lookupName(name, dynamodb) {
    const nameArray = dynamodb.prefix ? [].concat(dynamodb.prefix) : [];
    nameArray.push(name);
    return nameArray.join(dynamodb.delimiter);
}
exports.lookupName = lookupName;
