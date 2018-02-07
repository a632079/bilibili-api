"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const clientProperties_1 = __importDefault(require("../../clientProperties"));
const signQuery_1 = __importDefault(require("../../signQuery"));
const got_1 = __importDefault(require("got"));
const query_string_1 = __importDefault(require("query-string"));
const cookie_1 = __importDefault(require("cookie"));
const tunnel_1 = __importDefault(require("tunnel"));
const clientProperties = new clientProperties_1.default();
async function getKey() {
    const params = {
        appkey: clientProperties.getAppKey(),
        build: clientProperties.getBuild(),
        mobi_app: 'android',
        platform: 'android',
        ts: Date.now().toString().slice(0, 10)
    };
    params.sign = signQuery_1.default.calculateSign(params);
    const options = {
        body: query_string_1.default.stringify(params),
        agent: tunnel_1.default.httpOverHttp({
            proxy: {
                host: '127.0.0.1',
                port: 8888,
                headers: {}
            }
        })
    };
    try {
        const response = await got_1.default.post('https://passport.bilibili.com/api/oauth2/getKey', options);
        const Body = JSON.parse(response.body);
        if (Body.code !== 0) {
            console.log(response.body);
            return false;
        }
        else {
            const ret = {
                hash: Body.data.hash,
                key: Body.data.key,
                cookie: (response.headers['set-cookie']) ? response.headers['set-cookie'][0] : ''
            };
            if (!ret.cookie) {
                delete ret.cookie;
            }
            else {
                ret.cookie = cookie_1.default.serialize('sid', (cookie_1.default.parse(ret.cookie).sid)) + ';';
            }
            return ret;
        }
    }
    catch (e) {
        console.log(e);
        return false;
    }
}
exports.default = getKey;
//# sourceMappingURL=getKey.js.map