/// <reference types="request-promise" />
import rq from 'request-promise';
export declare class QuerySign {
    static generateRequest(method: string, url: string, params: object, body?: boolean, option?: {
        cookie?: string;
        headers?: object;
    }): rq.RequestPromise;
    static generateQuery(params?: object): string;
    private static calculateSign(params);
}
