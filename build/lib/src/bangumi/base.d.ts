export interface Bangumi {
    getInfo(seasonId: number): Promise<BangumiResponse>;
}
export interface BangumiResponse {
    status: number;
    message: string;
    data?: object;
}
export declare class Bangumi implements Bangumi {
    getRecommend(seasonId: number, option?: {
        season_type?: number;
    }): Promise<BangumiResponse>;
    getMediaInfo(mediaId: number): Promise<BangumiResponse>;
    getMediaSource(mediaId: number): Promise<BangumiResponse>;
}
