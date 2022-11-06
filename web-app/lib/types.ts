export declare type PromiseResult<T> = T extends Promise<infer U> ? U : T;
