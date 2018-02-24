import { Bilibili } from '../../bilibili';
export interface Bangumi {
    getInfo(seasonId: number): Promise<BangumiResponse>;
}
export interface BangumiResponse {
    status: number;
    message: string;
    data?: object;
}
export declare class Bangumi implements Bangumi {
    user: Bilibili['user'] | null;
    constructor(user?: Bilibili['user'] | null);
    getRecommend(seasonId: number, option?: {
        season_type?: number;
    }): Promise<BangumiResponse>;
    getMediaInfo(mediaId: number): Promise<BangumiResponse>;
    getMediaSource(mediaId: number): Promise<BangumiResponse>;
    getURL(cid: number, option?: {
        season_type?: number;
        qn?: number;
        track_path?: number;
    }): Promise<BangumiResponse>;
}
