export interface CacheRepositoryContract {
    set: (key: string, value: any) => Promise<void>;
    get: <T>(key: string) => Promise<T | null>;
    delete: (key: string) => Promise<void>;
}
