export interface Logins {
    login(username: string, password: string): Promise<LoginResponse>;
    withCaptcha(username: string, password: string, captcha: string, cookie: string): Promise<LoginResponse>;
}
export interface LoginResponse {
    status: number;
    message: string;
    data?: {
        mid: number;
        access_token: string;
        refresh_token: string;
        expires_in: number;
    };
    cookie?: string;
    ts: string;
}
declare class Login implements Logins {
    constructor();
    login(username: string, password: string): Promise<LoginResponse>;
    withCaptcha(username: string, password: string, captcha: string, cookie: string): Promise<LoginResponse>;
}
export default Login;
