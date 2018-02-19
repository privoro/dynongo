"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pify = require("pify");
const method_1 = require("./method");
class DeleteTable extends method_1.Method {
    constructor(table, dynamodb) {
        super(table, dynamodb);
        this.shouldWait = false;
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
        this.params.TableName = this.table.name;
        return pify(db.deleteTable.bind(db), Promise)(this.params)
            .then(() => {
            if (this.shouldWait === true) {
                return this.poll();
            }
        })
            .catch(err => {
            if (err && err.name !== 'ResourceNotFoundException') {
                throw err;
            }
        });
    }
    poll() {
        return this.pollHelper()
            .then(() => this.poll())
            .catch(err => {
            if (err && err.name !== 'ResourceNotFoundException') {
                throw err;
            }
        });
    }
    pollHelper() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const db = this.dynamodb.raw;
                db.describeTable({ TableName: this.params.TableName }, (err, data) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(data);
                });
            }, this.waitMs);
        });
    }
}
exports.DeleteTable = DeleteTable;
