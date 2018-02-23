'use strict';
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
function getCaptcha(cookie) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = 'https://passport.bilibili.com/captcha ';
        const jar = request_promise_1.default.jar();
        jar.setCookie(cookie, url);
        const response = yield request_promise_1.default.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 BiliDroid/5.15.0 (bbcallen@gmail.com)'
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
    });
}
exports.default = getCaptcha;
//# sourceMappingURL=getCaptcha.js.map