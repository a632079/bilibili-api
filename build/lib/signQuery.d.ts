declare class QuerySign {
    static calculateSign(params: object): string | undefined;
    private static generateQuery(params);
}
export = QuerySign;
