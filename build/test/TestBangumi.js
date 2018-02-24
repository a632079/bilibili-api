"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const core_1 = __importDefault(require("../core"));
const bilibili = new core_1.default({
    cookie: 'sid=kvz3mnoe',
    data: {
        mid: 4716170,
        access_token: 'e05a080c7e4ef3099b098d5819d0e101',
        refresh_token: '9577f92ede1e4287ce312e34a17b7cc9',
        expires_in: 2592000
    }
});
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
    it('Get PlayURL', (done) => {
        bilibili.Bangumi.getURL(16224328)
            .then(_ => {
            console.log(_);
            chai_1.expect(_).not.to.be.empty;
            chai_1.expect(_.status).to.be.equal(0);
            chai_1.expect(_.data).not.to.be.empty;
            done();
        })
            .catch(e => done(e));
    });
});
//# sourceMappingURL=TestBangumi.js.map