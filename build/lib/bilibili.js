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
const login_1 = __importDefault(require("./src/passport/login"));
const getCaptcha_1 = __importDefault(require("./src/passport/getCaptcha"));
const base_1 = require("./src/search/base");
const base_2 = require("./src/bangumi/base");
const login = new login_1.default();
class Bilibili {
    constructor() {
        // include Classes
        this.Search = class extends base_1.Search {
        };
        this.Bangumi = new base_2.Bangumi();
        return this;
    }
    load(store) {
        this.user = store;
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield login.login(username, password);
            if (result.status == 0 && result.data && result.cookie) {
                this.user = {
                    cookie: result.cookie,
                    data: result.data
                };
            }
            return result;
        });
    }
    loginWithCaptcha(username, password, captcha, cookie) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!cookie) {
                cookie = (this.cookie) ? this.cookie : '';
            }
            const result = yield login.withCaptcha(username, password, captcha, cookie);
            if (result.status == 0 && result.data && result.cookie) {
                this.user = {
                    cookie: result.cookie,
                    data: result.data
                };
            }
            return result;
        });
    }
    getCaptcha(cookie = '') {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield getCaptcha_1.default(cookie);
            this.cookie = result.cookie;
            return result;
        });
    }
}
exports.default = Bilibili;
//# sourceMappingURL=bilibili.js.map