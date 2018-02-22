"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const request_promise_1 = __importDefault(require("request-promise"));
async function getKey() {
    const params = utils_1.QuerySign.generateQuery();
    // console.log(params)
    const jar = request_promise_1.default.jar();
    const options = {
        form: params,
        headers: {
            'User-Agent': ''
        },
        resolveWithFullResponse: true,
    };
    const url = 'https://passport.bilibili.com/api/oauth2/getKey';
    const response = await request_promise_1.default.post(url, options);
    const Body = JSON.parse(response.body);
    // console.log(Body)
    if (Body.code !== 0) {
        return false;
    }
    else {
        const ret = {
            hash: Body.data.hash,
            key: Body.data.key
        };
        const Cookie = jar.getCookieString(url);
        if (Cookie) {
            ret.cookie = Cookie;
        }
        return ret;
    }
}
exports.default = getKey;
//# sourceMappingURL=getKey.js.map