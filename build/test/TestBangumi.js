"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const core_1 = __importDefault(require("../core"));
const bilibili = new core_1.default();
describe('Test Bangumi', () => {
    it('Get Season Info', (done) => {
        bilibili.Bangumi.getInfo(5997)
            .then(_ => {
            // console.log(_)
            chai_1.expect(_).not.to.be.empty;
            chai_1.expect(_.status).to.be.equal(0);
            chai_1.expect(_.data).not.to.be.empty;
            done();
        })
            .catch(e => done(e));
    });
    it('Get Recommend', (done) => {
        bilibili.Bangumi.getRecommend(5997)
            .then(_ => {
            chai_1.expect(_).not.to.be.empty;
            chai_1.expect(_.status).to.be.equal(0);
            chai_1.expect(_.data).not.to.be.empty;
            done();
        })
            .catch(e => done(e));
    });
    it('Get Media Info', (done) => {
        bilibili.Bangumi.getMediaInfo(5997)
            .then(_ => {
            chai_1.expect(_).not.to.be.empty;
            chai_1.expect(_.status).to.be.equal(0);
            chai_1.expect(_.data).not.to.be.empty;
            done();
        })
            .catch(e => done(e));
    });
    it('Get Media Source', (done) => {
        bilibili.Bangumi.getMediaSource(5997)
            .then(_ => {
            chai_1.expect(_).not.to.be.empty;
            chai_1.expect(_.status).to.be.equal(0);
            chai_1.expect(_.data).not.to.be.empty;
            done();
        })
            .catch(e => done(e));
    });
});
//# sourceMappingURL=TestBangumi.js.map