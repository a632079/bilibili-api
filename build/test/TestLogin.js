"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const core_1 = __importDefault(require("../core"));
const bilibili = new core_1.default();
describe('TestLogin', () => {
    it('Should Be Login Successfully', (done) => {
        bilibili.login('test', 'test')
            .then(result => {
            console.log(result);
            chai_1.expect(result).to.not.be.empty;
            chai_1.expect(result.status).to.equal(0);
            done();
        })
            .catch(e => {
            done(e);
        });
    });
});
//# sourceMappingURL=TestLogin.js.map