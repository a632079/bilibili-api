import { LoginResponse } from './src/passport/login';
import { Captcha } from './src/passport/getCaptcha';
import { SearchResponse, searchType } from './src/search/base';
import { Bangumi } from './src/bangumi/base';
export interface Bilibili {
    constructor(store: Bilibili['user'] | null): Bilibili;
    user: {
        data: {
            mid: number;
            access_token: string;
            refresh_token: string;
            expires_in: number;
        };
        cookie: string;
    } | null;
    cookie: string;
    login(username: string, password: string): Promise<LoginResponse>;
    loginWithCaptcha(username: string, password: string, captcha: string, cookie?: string): Promise<LoginResponse>;
    getCaptcha(cookie?: string): Promise<Captcha>;
}
export declare class Bilibili implements Bilibili {
    constructor(store?: Bilibili['user'] | null);
    store(): object | null;
    Search: {
        new (): {
            keyword(keyword: string, page: number, limit: number): Promise<SearchResponse>;
            typeSearch(keyword: string, type: searchType, page: number, limit: number): Promise<SearchResponse>;
            hot(): Promise<SearchResponse>;
            suggest(keyword: string): Promise<SearchResponse>;
        };
        keyword(keyword: string, page?: number, limit?: number): Promise<SearchResponse>;
        typeSearch(keyword: string, type?: searchType, page?: number, limit?: number): Promise<SearchResponse>;
        suggest(keyword: string): Promise<SearchResponse>;
        hot(): Promise<SearchResponse>;
    };
    Bangumi: Bangumi;
}
