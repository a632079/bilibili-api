'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const request_promise_1 = __importDefault(require("request-promise"));
async function getCaptcha(cookie) {
    const url = 'https://passport.bilibili.com/captcha ';
    const jar = request_promise_1.default.jar();
    jar.setCookie(cookie, url);
    const response = await request_promise_1.default.get(url, {
        headers: {
            'User-Agent': ''
        },
        resolveWithFullResponse: true,
        jar: jar
    });
    const Cookie = jar.getCookieString(url);
    const captcha = Buffer.from(response.body, 'binary');
    const result = {
        cookie: Cookie,
        captcha
    };
    return result;
}
exports.default = getCaptcha;
//# sourceMappingURL=getCaptcha.js.map