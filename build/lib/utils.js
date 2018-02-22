"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const query_string_1 = __importDefault(require("query-string"));
const clientProperties_1 = __importDefault(require("./clientProperties"));
const clientProperties = new clientProperties_1.default();
function getTraceId(now = new Date()) {
    const date = now;
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = '0' + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate;
    }
    const result = `${date.getFullYear()}${month}${strDate}${date.getHours()}${date.getMinutes()}000${date.getSeconds()}`;
    return result;
}
class QuerySign {
    static generateQuery(params = {}) {
        const now = new Date();
        const base = {
            _device: 'android',
            _hwid: clientProperties.getHardwareId(),
            build: clientProperties.getBuild(),
            mobi_app: 'android',
            platform: 'android',
            scale: clientProperties.getScale(),
            src: 'google',
            ts: now.getTime().toString().slice(0, 10),
            trace_id: getTraceId(now),
            version: clientProperties.getVersion(),
            appkey: clientProperties.getAppKey()
        };
        // MergeParams
        Object.assign(params, base);
        // Get Sign
        const sign = this.calculateSign(params);
        return `${query_string_1.default.stringify(params)}&sign=${sign}`;
    }
    // 排序 params 并计算 sign
    // 传入值为 name1=value1 形式
    static calculateSign(params) {
        const MessageDigest = crypto_1.default.createHash('md5');
        MessageDigest.update(query_string_1.default.stringify(params) + clientProperties.getAppSecret());
        const md5 = MessageDigest.digest('hex');
        return md5;
    }
}
exports.QuerySign = QuerySign;
//# sourceMappingURL=utils.js.map