"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const request_promise_1 = __importDefault(require("request-promise"));
const getKey_1 = __importDefault(require("./getKey"));
const utils_1 = require("../../utils");
const crypto_1 = __importDefault(require("crypto"));
class Login {
    constructor() {
        return this;
    }
    async login(username, password) {
        // Bilibili Login
        const keys = await getKey_1.default();
        if (typeof keys === 'boolean') {
            throw new Error('Can\'t Get Key');
        }
        // Encrypt password
        password = crypto_1.default.publicEncrypt({
            key: keys.key,
            padding: 1
        }, Buffer.from(`${keys.hash}${password}`)).toString('base64');
        const params = utils_1.QuerySign.generateQuery({ username, password });
        const jar = request_promise_1.default.jar();
        const url = 'https://passport.bilibili.com/api/oauth2/login';
        const response = await request_promise_1.default.post(url, {
            headers: {
                'User-Agent': ''
            },
            form: params,
            jar: jar,
            resolveWithFullResponse: true
        });
        const body = JSON.parse(response.body);
        if (body.code !== 0) {
            const result = {
                ts: body.ts,
                status: body.code,
                message: body.message
            };
            return result;
        }
        const result = {
            status: 0,
            message: '登入成功',
            data: body.data,
            ts: body.ts
        };
        const cookie = jar.getCookieString(url);
        if (cookie) {
            result.cookie = cookie;
        }
        return result;
    }
    async withCaptcha(username, password, captcha, cookie) {
        // Bilibili Login
        const keys = await getKey_1.default();
        if (typeof keys === 'boolean') {
            throw new Error('Can\'t Get Key');
        }
        // Encrypt password
        password = crypto_1.default.publicEncrypt({
            key: keys.key,
            padding: 1
        }, Buffer.from(`${keys.hash}${password}`)).toString('base64');
        const params = utils_1.QuerySign.generateQuery({ username, password, captcha });
        const url = 'https://passport.bilibili.com/api/oauth2/login';
        const jar = request_promise_1.default.jar();
        jar.setCookie(cookie, url);
        const response = await request_promise_1.default.post(url, {
            headers: {
                'User-Agent': ''
            },
            form: params,
            jar: jar,
            resolveWithFullResponse: true
        });
        const body = JSON.parse(response.body);
        if (body.code !== 0) {
            const result = {
                ts: body.ts,
                status: body.code,
                message: body.message
            };
            return result;
        }
        const result = {
            status: 0,
            message: '登入成功',
            data: body.data,
            ts: body.ts
        };
        const cookies = jar.getCookieString(url);
        if (cookies) {
            result.cookie = cookies;
        }
        return result;
    }
}
exports.default = Login;
//# sourceMappingURL=login.js.map