'use strict';
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
// Require Dependence
const Bluebird = __importStar(require("bluebird"));
global.Promise = Bluebird.Promise;
// Load Lib
const bilibili_1 = require("./lib/bilibili");
exports.default = bilibili_1.Bilibili;
//# sourceMappingURL=core.js.map