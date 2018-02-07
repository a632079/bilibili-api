'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const got_1 = __importDefault(require("got"));
const cookie_1 = __importDefault(require("cookie"));
async function getCaptcha(cookie) {
    const config = {
        headers: {
            'Cookie': cookie
        },
        encoding: null
    };
    try {
        const response = await got_1.default('https://passport.bilibili.com/captcha', config);
        const JSESSIONID = 'JSESSIONID=' + cookie_1.default.parse(response.headers['set-cookie'][0]).JSESSIONID + ';';
        let retCookie = cookie + ' ' + JSESSIONID;
        return {
            captcha: response['body'],
            cookie: retCookie
        };
    }
    catch (e) {
        console.log(e);
        return false;
    }
}
exports.default = getCaptcha;
//# sourceMappingURL=getCaptcha.js.map