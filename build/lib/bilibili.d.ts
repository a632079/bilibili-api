import { LoginResponse } from './src/passport/login';
import { Captcha } from './src/passport/getCaptcha';
interface Bilibili {
    login(username: string, password: string): Promise<LoginResponse>;
    loginWithCaptcha(username: string, password: string, captcha: string, cookie: string): Promise<LoginResponse>;
    getCaptcha(cookie?: string): Promise<Captcha>;
}
declare class Bilibili implements Bilibili {
    constructor();
}
export default Bilibili;
