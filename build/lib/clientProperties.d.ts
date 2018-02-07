declare class ClientProperties {
    private appKey;
    private appSecret;
    private hardwareId;
    private scale;
    private version;
    private build;
    private buvId;
    constructor();
    setVersion(version: string): ClientProperties;
    setHardwareId(hardwareId: string): ClientProperties;
    setScale(scale: string): ClientProperties;
    setAppKey(appKey: string): ClientProperties;
    setAppSecret(appSecret: string): ClientProperties;
    setBuvId(buvId: string): ClientProperties;
    getAppKey(): string;
    getAppSecret(): string;
    getHardwareId(): string;
    getScale(): string;
    getVersion(): string;
    getBuild(): string;
    getBuvId(): string;
    private generateBuildProperty();
}
export = ClientProperties;
