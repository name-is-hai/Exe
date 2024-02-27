import { ApiResponse, CustomeResponse } from '@/types';
import http from '@/utils/http';
import { useEffect, useState } from 'react';
function useApi(url, method, key?, params?, needAuth = false) {
    const [data, setData] = useState<CustomeResponse>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                let response: ApiResponse;
                switch (method.toUpperCase()) {
                    case 'GET':
                        response = await http.get(url, params, needAuth);
                        break;
                    case 'POST':
                        response = await http.post(url, params, needAuth);
                        break;
                    case 'PUT':
                        response = await http.put(url, params, needAuth);
                        break;
                    case 'DELETE':
                        response = await http.delete(url, params, needAuth);
                        break;
                    default:
                        throw new Error(`Unsupported method: ${method}`);
                }
                setData(response.resp);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return { data, loading, error };
}

const useGet = (url: string, params?: string, key?, needAuth = false) => {
    return useApi(url, 'GET', key, params, needAuth)
};
const usePost = (url: string, params: Object, key?, needAuth = false) => {
    return useApi(url, 'POST', key, params, needAuth)
};
const usePut = (url: string, params: Object, key?, needAuth = false) => {
    return useApi(url, 'PUT', key, params, needAuth)
};
const useDelete = (url: string, params: string, key?, needAuth = false) => {
    return useApi(url, 'DELETE', key, params, needAuth)
};

export { useGet, usePost, usePut, useDelete };

