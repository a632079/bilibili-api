export interface Search {
    keyword(keyword: string, page: number, limit: number): Promise<SearchResponse>;
    typeSearch(keyword: string, type: searchType, page: number, limit: number): Promise<SearchResponse>;
    hot(): Promise<SearchResponse>;
    suggest(keyword: string): Promise<SearchResponse>;
}
export interface SearchResponse {
    status: number;
    message: string;
    data?: object;
}
export declare class Search implements Search {
    static keyword(keyword: string, page?: number, limit?: number): Promise<SearchResponse>;
    static typeSearch(keyword: string, type?: searchType, page?: number, limit?: number): Promise<SearchResponse>;
    static suggest(keyword: string): Promise<SearchResponse>;
    static hot(): Promise<SearchResponse>;
}
export declare enum searchType {
    bangumi = 7,
    user = 2,
    movie = 8,
    read = 6,
}
