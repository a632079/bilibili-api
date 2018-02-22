/// <reference types="node" />
export interface Captcha {
    captcha: Buffer;
    cookie: string;
}
declare function getCaptcha(cookie: string): Promise<Captcha>;
export default getCaptcha;
