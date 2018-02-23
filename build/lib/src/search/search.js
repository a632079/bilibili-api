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
const request_promise_1 = __importDefault(require("request-promise"));
const utils_1 = require("../../utils");
class Search {
    static keyword(keyword, page = 1, limit = 20) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * 搜索，顾名思义
             * @param {string} keyword
             * @param {number} page
             * @param {number} limit
             * @returns {Promise<any>}
             */
            const params = {
                duration: 0,
                from_source: 'app_search',
                pn: page,
                ps: limit,
                keyword: keyword,
                highlight: 1
            };
            const qs = utils_1.QuerySign.generateQuery(params);
            const responseBody = yield request_promise_1.default.get(`https://app.bilibili.com/x/v2/search?${qs}`, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 BiliDroid/5.15.0 (bbcallen@gmail.com)'
                },
                qs: qs,
                json: true
            });
            const ret = {
                status: responseBody.code,
                message: responseBody.message
            };
            if (responseBody.code === 0) {
                ret.data = responseBody.data;
            }
            return ret;
        });
    }
    static typeSearch(keyword, type = 7, page = 1, limit = 20) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * 种类搜索, 不得不吐槽 B 站的 API
             * @param {string} keyword
             * @param {SearchType} type
             * @param {number} page
             * @param {number} limit
             * @returns {Promise<any>}
             */
            let params = {
                pn: page,
                ps: limit,
                type: type,
                keyword
            };
            switch (type) {
                case 7:// Bangumi
                    // do nothing
                    break;
                case 2:// User
                    Object.assign(params, {
                        user_type: 0,
                        order: 'totalrank',
                        highlight: 1
                    });
                    break;
                case 8:// movie
                    // do nothing
                    break;
                case 6:// 专栏搜索
                    Object.assign(params, {
                        categroy_id: 0,
                        highlight: 1,
                    });
                default:
                    // Bangumi
                    params.type = 7;
                    break;
            }
            // Make Request
            const qs = utils_1.QuerySign.generateQuery(params);
            const responseBody = yield request_promise_1.default.get(`https://app.bilibili.com/x/v2/search/type?${qs}`, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 BiliDroid/5.15.0 (bbcallen@gmail.com)'
                },
                json: true
            });
            const ret = {
                status: responseBody.code,
                message: responseBody.message
            };
            if (responseBody.code === 0) {
                ret.data = responseBody.data;
            }
            return ret;
        });
    }
    static suggest(keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                keyword,
                type: 'accurate'
            };
            const qs = utils_1.QuerySign.generateQuery(params);
            const responseBody = yield request_promise_1.default.get(`https://app.bilibili.com/x/v2/search/suggest?${qs}`, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 BiliDroid/5.15.0 (bbcallen@gmail.com)'
                },
                json: true
            });
            const ret = {
                status: responseBody.code,
                message: responseBody.message
            };
            if (responseBody.code === 0) {
                ret.data = responseBody.data;
            }
            return ret;
        });
    }
    static hot() {
        return __awaiter(this, void 0, void 0, function* () {
            const qs = utils_1.QuerySign.generateQuery({ limit: 50 });
            const responseBody = yield request_promise_1.default.get(`https://app.bilibili.com/x/v2/search/hot?${qs}`, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 BiliDroid/5.15.0 (bbcallen@gmail.com)'
                },
                json: true
            });
            const ret = {
                status: responseBody.code,
                message: responseBody.message
            };
            if (responseBody.code === 0) {
                ret.data = responseBody.data;
            }
            return ret;
        });
    }
}
exports.Search = Search;
var searchType;
(function (searchType) {
    searchType[searchType["bangumi"] = 7] = "bangumi";
    searchType[searchType["user"] = 2] = "user";
    searchType[searchType["movie"] = 8] = "movie";
    searchType[searchType["read"] = 6] = "read"; // 专栏搜索
})(searchType = exports.searchType || (exports.searchType = {}));
//# sourceMappingURL=search.js.map