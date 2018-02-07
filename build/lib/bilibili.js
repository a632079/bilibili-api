"use strict";
class Bilibili {
    constructor(login) {
        this.loginInfo = login;
        return this;
    }
    async login() {
        const info = this.loginInfo;
        return {
            msg: '',
            status: 2,
            ts: 2
        };
    }
}
module.exports = Bilibili;
//# sourceMappingURL=bilibili.js.map