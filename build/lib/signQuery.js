"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
const crypto_1 = __importDefault(require("crypto"));
const query_string_1 = __importDefault(require("query-string"));
const clientProperties_1 = __importDefault(require("./clientProperties"));
const clientProperties = new clientProperties_1.default();
class QuerySign {
    // 排序 params 并计算 sign
    // 传入值为 name1=value1 形式
    static calculateSign(params) {
        try {
            const MessageDigest = crypto_1.default.createHash('md5');
            MessageDigest.update(this.generateQuery(params) + clientProperties.getAppSecret());
            const md5 = MessageDigest.digest('hex');
            return md5;
        }
        catch (e) {
            console.log(e);
        }
    }
    static generateQuery(params) {
        return query_string_1.default.stringify(params);
    }
}
module.exports = QuerySign;
//# sourceMappingURL=signQuery.js.map