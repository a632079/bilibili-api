export interface Key {
    hash: string;
    key: string;
    cookie?: string;
}
declare function getKey(): Promise<Key | boolean>;
export default getKey;
