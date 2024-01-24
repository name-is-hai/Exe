import { ApiResponse } from "@/types";


class HttpClient {
    protected baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    protected async handleResponse(response: Response) {
        if (response.status === 401) {
            // TODO document why this block is empty
        }

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        try {
            return await response.json();
        } catch (error) {
            throw new Error("Failed to parse JSON response");
        }
    }

    protected async retryOriginalRequest<T>(response: Response): Promise<T> {
        const retryResponse = await fetch(response.url, response.clone());
        return this.handleResponse(retryResponse);
    }

    protected async addAuthorizationHeader(requestConfig: RequestInit): Promise<RequestInit> {
        const token = localStorage.getItem("access_token");

        if (token) {
            requestConfig.headers = {
                ...requestConfig.headers,
                Authorization: `Bearer ${token}`,
            };
        }

        return requestConfig;
    }

    protected async makeRequest<T>(
        url: string,
        method: string,
        params?: any,
        needAuth?: boolean,
    ): Promise<ApiResponse<T>> {
        const requestConfig: RequestInit = {
            method,
            headers: {
                "Content-Type": "application/json",
            },
        };

        if (params) {
            requestConfig.body = JSON.stringify(params);
        }

        const result: ApiResponse<T> = {
            isLoaded: true,
        };

        if (needAuth) {
            const configWithAuthorization = await this.addAuthorizationHeader(requestConfig);

            try {
                const response = await fetch(`${this.baseUrl}${url}`, configWithAuthorization);
                result.resp = (await this.handleResponse(response)) as T;
            } catch (error) {
                result.error = error as Error;
            } finally {
                result.isLoaded = false;
            }
        } else {
            try {
                const response = await fetch(`${this.baseUrl}${url}`, requestConfig);
                result.resp = (await this.handleResponse(response)) as T;
            } catch (error) {
                result.error = error as Error;
            } finally {
                result.isLoaded = false;
            }
        }

        return result;
    }

    async get<T>(url: string, params?: Record<string, string>, needAuth?: boolean): Promise<ApiResponse<T>> {
        const urlWithParams = new URL(url, this.baseUrl);
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                urlWithParams.searchParams.set(key, value);
            });
        }

        return this.makeRequest<T>(urlWithParams.toString(), "GET", needAuth);
    }

    async post<T>(url: string, params: any, needAuth?: boolean): Promise<ApiResponse<T>> {
        return this.makeRequest<T>(url, "POST", params, needAuth);
    }

    async put<T>(url: string, params: any, needAuth?: boolean): Promise<ApiResponse<T>> {
        return this.makeRequest<T>(url, "PUT", params, needAuth);
    }

    async delete<T>(url: string, needAuth?: boolean): Promise<ApiResponse<T>> {
        return this.makeRequest<T>(url, "DELETE", needAuth);
    }
}

export default HttpClient;
