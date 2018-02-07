"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const signQuery_1 = __importDefault(require("../lib/signQuery"));
const clientProperties_1 = __importDefault(require("../lib/clientProperties"));
const query_string_1 = __importDefault(require("query-string"));
const axios_1 = __importDefault(require("axios"));
const clientProperties = new clientProperties_1.default();
describe('Get Sign', () => {
    const params = {
        appkey: clientProperties.getAppKey(),
        build: clientProperties.getBuild(),
        mobi_app: 'android',
        platform: 'android',
        ts: Date.now().toString().slice(0, 10)
    };
    const ret = signQuery_1.default.calculateSign(params);
    console.log('qs:', query_string_1.default.stringify(params));
    console.log('Sign Value:', ret);
    it('Sign Must be True', () => {
        // tslint:disable-next-line:no-unused-expression
        chai_1.expect(!!ret).to.be.true;
    });
    const post = query_string_1.default.parse(query_string_1.default.stringify(params) + '&sign=' + ret);
    console.log(post);
    it('Must Get Data', async () => {
        let res = await axios_1.default({
            method: 'post',
            url: 'https://passport.bilibili.com/api/oauth2/getKey',
            data: query_string_1.default.stringify(post)
        });
        console.log('Res Data:', res);
        // tslint:disable-next-line:no-unused-expression
        chai_1.expect(res.data.code === 0).to.be.true;
    });
});
//# sourceMappingURL=getSign.js.map