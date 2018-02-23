import { LoginResponse } from './src/passport/login';
import { Captcha } from './src/passport/getCaptcha';
import { Search, SearchResponse, searchType } from './src/search/base';
import { Bangumi } from './src/bangumi/base';
interface Bilibili extends Search {
    user: {
        data: object;
        cookie: string;
    };
    cookie: string;
    load(store: object): void;
    login(username: string, password: string): Promise<LoginResponse>;
    loginWithCaptcha(username: string, password: string, captcha: string, cookie?: string): Promise<LoginResponse>;
    getCaptcha(cookie?: string): Promise<Captcha>;
}
declare class Bilibili implements Bilibili {
    constructor();
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
export default Bilibili;
