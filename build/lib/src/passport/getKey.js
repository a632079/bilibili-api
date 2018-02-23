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
const utils_1 = require("../../utils");
const request_promise_1 = __importDefault(require("request-promise"));
function getKey() {
    return __awaiter(this, void 0, void 0, function* () {
        const params = utils_1.QuerySign.generateQuery();
        // console.log(params)
        const jar = request_promise_1.default.jar();
        const options = {
            form: params,
            headers: {
                'User-Agent': 'Mozilla/5.0 BiliDroid/5.15.0 (bbcallen@gmail.com)'
            },
            resolveWithFullResponse: true,
        };
        const url = 'https://passport.bilibili.com/api/oauth2/getKey';
        const response = yield request_promise_1.default.post(url, options);
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
    });
}
exports.default = getKey;
//# sourceMappingURL=getKey.js.map