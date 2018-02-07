"use strict";
class ClientProperties {
    constructor() {
        this.appKey = '1d8b6e7d45233436';
        this.appSecret = '560c52ccd288fed045859ed18bffd973';
        this.hardwareId = 'JxdyESFAJkcjEicQbBBsCTlbal5uX2Y';
        this.scale = 'xxhdpi';
        this.version = '5.15.0.515000';
        this.build = '';
        this.buvId = 'JxdyESFAJkcjEicQbBBsCTlbal5uX2Yinfoc';
        this.generateBuildProperty();
        return this;
    }
    setVersion(version) {
        if (version) {
            this.version = version;
            this.generateBuildProperty();
            return this;
        }
        else {
            return this;
        }
    }
    setHardwareId(hardwareId) {
        this.hardwareId = hardwareId;
        return this;
    }
    setScale(scale) {
        this.scale = scale;
        return this;
    }
    setAppKey(appKey) {
        this.appKey = appKey;
        return this;
    }
    setAppSecret(appSecret) {
        this.appSecret = appSecret;
        return this;
    }
    setBuvId(buvId) {
        this.buvId = buvId;
        return this;
    }
    getAppKey() {
        return this.appKey;
    }
    getAppSecret() {
        return this.appSecret;
    }
    getHardwareId() {
        return this.hardwareId;
    }
    getScale() {
        return this.scale;
    }
    getVersion() {
        return this.version;
    }
    getBuild() {
        return this.build;
    }
    getBuvId() {
        return this.buvId;
    }
    generateBuildProperty() {
        this.build = this.version.substring(this.version.lastIndexOf('.') + 1);
    }
}
module.exports = ClientProperties;
//# sourceMappingURL=clientProperties.js.map