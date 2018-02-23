"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const core_1 = __importDefault(require("../core"));
const bilibili = new core_1.default();
describe('Test Search', () => {
    it('Common Search', (done) => {
        bilibili.Search.keyword('Fate')
            .then(_ => {
            chai_1.expect(_).not.to.be.empty;
            chai_1.expect(_.status).to.be.equal(0);
            done();
        })
            .catch(e => done(e));
    });
    it('Type Search, test bangumi', (done) => {
        bilibili.Search.typeSearch('Fate')
            .then(_ => {
            chai_1.expect(_).not.to.be.empty;
            chai_1.expect(_.status).to.be.equal(0);
            done();
        })
            .catch(e => done(e));
    });
    it('Suggest Search', (done) => {
        bilibili.Search.suggest('Fate')
            .then(_ => {
            chai_1.expect(_).not.to.be.empty;
            chai_1.expect(_.status).to.be.equal(0);
            done();
        })
            .catch(e => done(e));
    });
    it('Get Hot tags', (done) => {
        bilibili.Search.hot()
            .then(_ => {
            chai_1.expect(_).not.to.be.empty;
            chai_1.expect(_.status).to.be.equal(0);
            done();
        })
            .catch(e => done(e));
    });
});
//# sourceMappingURL=TestSearch.js.map