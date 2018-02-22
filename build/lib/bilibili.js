"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const login_1 = __importDefault(require("./src/passport/login"));
const getCaptcha_1 = __importDefault(require("./src/passport/getCaptcha"));
const login = new login_1.default();
class Bilibili {
    constructor() {
        return this;
    }
    async login(username, password) {
        return login.login(username, password);
    }
    async loginWithCaptcha(username, password, captcha, cookie) {
        return login.withCaptcha(username, password, captcha, cookie);
    }
    async getCaptcha(cookie = '') {
        return getCaptcha_1.default(cookie);
    }
}
exports.default = Bilibili;
//# sourceMappingURL=bilibili.js.map