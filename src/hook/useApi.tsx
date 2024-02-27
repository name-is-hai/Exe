import { ApiResponse, CustomeResponse } from '@/types';
import http from '@/utils/http';
import { useEffect, useState } from 'react';
function useApi(url, method, key?, params?, needAuth = false) {
    const [data, setData] = useState<CustomeResponse>(null);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let response;
        switch (method.toUpperCase()) {
            case 'GET':
                response = http.get(url, params, needAuth);
                break;
            case 'POST':
                response = http.post(url, params, needAuth);
                break;
            case 'PUT':
                response = http.put(url, params, needAuth);
                break;
            case 'DELETE':
                response = http.delete(url, params, needAuth);
                break;
            default:
                throw new Error(`Unsupported method: ${method}`);
        }
        response.then(resp => {
            setData(resp.resp);
            setLoaded(true);
        }).catch(err => {
            setError(err);
        })
    }, []);

    return { data, loaded, error };
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

