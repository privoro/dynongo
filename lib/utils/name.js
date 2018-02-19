"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
const indexify = (key, value, values) => {
    if (values[key] && values[key] !== value) {
        let i = 1;
        while (values[`${key}_${i}`] && values[`${key}_${i}`] !== value) {
            ++i;
        }
        key += `_${i}`;
    }
    return key;
};
function generateKeyName(key) {
    const tokens = key.split('.');
    const expression = [];
    const names = {};
    for (let token of tokens) {
        let expressionKey = `#k_${token.replace(/[^a-zA-Z0-9_\[\]]+/g, '_')}`;
        expression.push(expressionKey);
        expressionKey = expressionKey.replace(/\[[0-9]+]/g, '');
        token = token.replace(/\[[0-9]+]/g, '');
        names[expressionKey] = token;
    }
    return {
        Expression: expression.join('.'),
        ExpressionAttributeNames: names
    };
}
exports.generateKeyName = generateKeyName;
function generateValueName(key, value, values, raw) {
    if (value === undefined) {
        throw new Error(`Value for key \`${key}\` is undefined. Please provide a valid value.`);
    }
    values = values || {};
    const valueKey = ':v_' + key.replace(/[^a-zA-Z0-9_]+/g, '_');
    let expression = [];
    const expressionValues = {};
    if (Array.isArray(value) && !raw) {
        for (let i = 0; i < value.length; i++) {
            const tempKey = indexify(`${valueKey}_${i}`, value, values);
            expression.push(tempKey);
            expressionValues[tempKey] = value[i];
        }
    }
    else {
        expression = indexify(valueKey, value, values);
        expressionValues[expression] = value;
    }
    return {
        Expression: expression,
        ExpressionAttributeValues: expressionValues
    };
}
exports.generateValueName = generateValueName;
