import { getLSData } from "@/lib/utils";
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
        const token = getLSData("access_token");

        if (token) {
            requestConfig.headers = {
                ...requestConfig.headers,
                Authorization: `Bearer ${token}`,
            };
        }

        return requestConfig;
    }

    protected async makeRequest(
        url: string,
        method: string,
        params?: any,
        needAuth?: boolean,
    ): Promise<ApiResponse> {
        const requestConfig: RequestInit = {
            method,
            headers: {
                "Content-Type": "application/json",
            },
        };

        if (params) {
            requestConfig.body = JSON.stringify(params);
        }

        const result: ApiResponse = {
            isLoaded: true,
        };

        if (needAuth) {
            const configWithAuthorization = await this.addAuthorizationHeader(requestConfig);

            try {
                const response = await fetch(`${this.baseUrl}${url}`, configWithAuthorization);
                result.resp = (await this.handleResponse(response));
            } catch (error) {
                result.error = error as Error;
            } finally {
                result.isLoaded = false;
            }
        } else {
            try {
                const response = await fetch(`${this.baseUrl}${url}`, requestConfig);
                result.resp = (await this.handleResponse(response));
            } catch (error) {
                result.error = error as Error;
            } finally {
                result.isLoaded = false;
            }
        }

        return result;
    }

    async get(url: string, params?: string, needAuth?: boolean): Promise<ApiResponse> {
        const urlWithParams = new URL(url, this.baseUrl);
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                urlWithParams.searchParams.set(key, value);
            });
        }

        return this.makeRequest(urlWithParams.toString(), "GET", needAuth);
    }

    async post(url: string, params: Object, needAuth?: boolean): Promise<ApiResponse> {
        return this.makeRequest(url, "POST", params, needAuth);
    }

    async put(url: string, params: Object, needAuth?: boolean): Promise<ApiResponse> {
        return this.makeRequest(url, "PUT", params, needAuth);
    }

    async delete(url: string, params?: string, needAuth?: boolean): Promise<ApiResponse> {
        return this.makeRequest(url, "DELETE", params, needAuth);
    }
}

const http = new HttpClient('https://exe-api.nameishai.id.vn');


export default http;
