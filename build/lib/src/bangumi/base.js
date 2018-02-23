"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
class Bangumi {
    getInfo(seasonId, option) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * 这个接口可获得番剧的集数啊什么什么的
             * @param {number} seasonId
             * @returns {Promise<any>}
            */
            const params = {
                season_id: seasonId,
                track_path: (option && option.track_path) ? option.track_path : 27
            };
            const body = yield utils_1.QuerySign.generateRequest('get', 'https://bangumi.bilibili.com/view/api/season', params, true);
            // console.log(body)
            const ret = {
                status: body.code,
                message: body.message
            };
            if (body.code === 0) {
                ret.data = body.result;
            }
            return ret;
        });
    }
    getRecommend(seasonId, option) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * 用于获得番剧的相关推荐
             * @param {number} seasonId
             * @returns {Promise<any>}
             */
            const params = {
                season_type: (option && option.season_type) ? option.season_type : 1,
                season_id: seasonId
            };
            const body = yield utils_1.QuerySign.generateRequest('get', 'https://bangumi.bilibili.com/view/api/season', params, true);
            const ret = {
                status: body.code,
                message: body.message
            };
            if (body.code === 0) {
                ret.data = body.result;
            }
            return ret;
        });
    }
    getMediaInfo(mediaId) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * 获取 Media 信息 （番剧页介绍）， 不想吐槽 API 有多乱了
             * @param {number} MediaId // 该 id 由 getInfo(SeasonId) 获得
             * @returns {Promise<any>}
             */
            const params = {
                media_id: mediaId
            };
            const body = yield utils_1.QuerySign.generateRequest('get', 'https://bangumi.bilibili.com/view/api/media', params, true);
            const ret = {
                status: body.code,
                message: body.message
            };
            if (body.code === 0) {
                ret.data = body.result;
            }
            return ret;
        });
    }
    getMediaSource(mediaId) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * 获取 Media 源信息 （番剧页介绍里面点下更多资料， 弹出的所谓简介的页面）
             * @param {number} MediaId // 该 id 由 getInfo(SeasonId) 获得
             * @returns {Promise<any>}
             */
            const params = {
                media_id: mediaId
            };
            const body = yield utils_1.QuerySign.generateRequest('get', 'https://bangumi.bilibili.com/media/api/detail', params, true);
            const ret = {
                status: body.code,
                message: body.message
            };
            if (body.code === 0) {
                ret.data = body.result;
            }
            return ret;
        });
    }
}
exports.Bangumi = Bangumi;
//# sourceMappingURL=base.js.map