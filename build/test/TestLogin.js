"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const signQuery_1 = __importDefault(require("../lib/signQuery"));
const clientProperties_1 = __importDefault(require("../lib/clientProperties"));
const getCaptcha_1 = __importDefault(require("../lib/src/passport/getCaptcha"));
const query_string_1 = __importDefault(require("query-string"));
const got_1 = __importDefault(require("got"));
const node_rsa_1 = __importDefault(require("node-rsa"));
const getKey_1 = __importDefault(require("../lib/src/passport/getKey"));
const imaging = require('imaging');
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const readline_sync_1 = __importDefault(require("readline-sync"));
const clientProperties = new clientProperties_1.default();
let cookie;
describe('Get Sign', () => {
    async function a() {
        const keys = await getKey_1.default();
        if (!keys || keys === true) {
            throw new Error('Can\'t Get Key');
        }
        const sign = new node_rsa_1.default(keys.key, 'public');
        cookie = keys.cookie || '';
        const username = 'a632079@gmail.com';
        const password = sign.encrypt(keys.hash + 'jr751103q', 'base64');
        // console.log(sign.decryptPublic(password, 'utf8'))
        const params = {
            appkey: clientProperties.getAppKey(),
            build: clientProperties.getBuild(),
            username: username,
            password: password,
            mobi_app: 'android',
            platform: 'android',
            ts: Date.now().toString().slice(0, 10)
        };
        const ret = signQuery_1.default.calculateSign(params);
        const post = query_string_1.default.stringify(params) + '&sign=' + ret;
        console.log(post);
        let res;
        try {
            res = await got_1.default('https://passport.bilibili.com/api/oauth2/login', {
                method: 'post',
                headers: {
                    'Cookie': cookie,
                    'User-Agent': '',
                    'Connection': 'Keep-live'
                },
                body: post
            });
        }
        catch (e) {
            throw e;
        }
        console.log('Res Data:', res.headers, res.body);
        const body = JSON.parse(res.body);
        if (body.code === -105) {
            // Need Captcha
            const captcha = await getCaptcha_1.default(cookie);
            if (!captcha || captcha === true) {
                throw new Error('can\'t get captcha');
            }
            cookie = captcha.cookie;
            console.log('Cookie:', cookie);
            // Write Pictrue
            // termImg(captcha.captcha, { fallback: () => { console.log('Not Support.') } })
            // console.log(captcha.captcha)
            const Path = path_1.default.join(__dirname, '../../img/' + Date.now().toString() + '.jpeg');
            fs_1.default.writeFileSync(Path, captcha.captcha, {
                encoding: 'binary'
            });
            const code = readline_sync_1.default.question('Open this pictrue: ' + Path + ' . Then, enter the captcha: \n Captcha: ');
            const params = {
                appkey: clientProperties.getAppKey(),
                build: clientProperties.getBuild(),
                username: username,
                password: password,
                mobi_app: 'android',
                platform: 'android',
                ts: Date.now().toString().slice(0, 10),
                captcha: code
            };
            const ret = signQuery_1.default.calculateSign(params);
            const post = query_string_1.default.stringify(params) + '&sign=' + ret;
            console.log(post);
            res = await got_1.default('https://passport.bilibili.com/api/oauth2/login', {
                method: 'post',
                headers: {
                    'Cookie': cookie,
                    'User-Agent': ''
                },
                body: post
            });
            const Resbody = JSON.parse(res.body);
            console.log(res.body);
        }
        else {
            // tslint:disable-next-line:no-unused-expression
            chai_1.expect(body.code === 0).to.be.true;
        }
    }
    a();
});
//# sourceMappingURL=TestLogin.js.map