"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pify = require("pify");
const method_1 = require("./method");
class CreateTable extends method_1.Method {
    constructor(table, dynamodb) {
        super(table, dynamodb);
        this.shouldWait = false;
    }
    initialize(schema) {
        this.schema = schema;
        return this;
    }
    wait(ms) {
        this.shouldWait = true;
        this.waitMs = ms || 1000;
        return this;
    }
    exec() {
        const db = this.dynamodb.raw;
        if (!db) {
            return Promise.reject(new Error('Call .connect() before executing queries.'));
        }
        this.schema.TableName = this.table.name;
        return pify(db.createTable.bind(db))(this.schema)
            .then(() => {
            if (this.shouldWait === true) {
                return this.poll();
            }
        })
            .catch(err => {
            if (err && err.name !== 'ResourceInUseException') {
                throw err;
            }
        });
    }
    poll() {
        return this.pollHelper()
            .then((data) => {
            if (data.Table.TableStatus.toLowerCase() !== 'active') {
                return this.poll();
            }
        });
    }
    pollHelper() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const db = this.dynamodb.raw;
                db.describeTable({ TableName: this.schema.TableName }, (err, data) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(data);
                });
            }, this.waitMs);
        });
    }
}
exports.CreateTable = CreateTable;
