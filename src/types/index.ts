export type ApiResponse<T> = {
    resp?: T;
    isLoaded: boolean;
    error?: Error;
};

export type Response = {
    code: number;
    data: any;
    message: string;
};