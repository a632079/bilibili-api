"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            // Bilibili Login
            const keys = yield getKey_1.default();
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
            const response = yield request_promise_1.default.post(url, {
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
        });
    }
    withCaptcha(username, password, captcha, cookie) {
        return __awaiter(this, void 0, void 0, function* () {
            // Bilibili Login
            const keys = yield getKey_1.default();
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
            const response = yield request_promise_1.default.post(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 BiliDroid/5.15.0 (bbcallen@gmail.com)'
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
        });
    }
}
exports.default = Login;
//# sourceMappingURL=login.js.map