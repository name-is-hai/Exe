import { getAccessToken } from '@/services/authen.service';
import { CustomeResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';

const BASE_URL = 'https://exe-api.nameishai.id.vn';

const addAuthorizationHeader = (requestConfig: RequestInit) => {
  const token = getAccessToken();

  if (token) {
    requestConfig.headers = {
      ...requestConfig.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return requestConfig;
};

const makeRequest = (
  url: string,
  method: 'POST' | 'GET' | 'PUT' | 'DELETE',
  params?: any,
  needAuth?: boolean
): Promise<Response> => {
  const requestConfig: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (params) {
    requestConfig.body = JSON.stringify(params);
  }
  let response;
  if (needAuth) {
    const configWithAuthorization = addAuthorizationHeader(requestConfig);
    response = fetch(`${BASE_URL}${url}`, configWithAuthorization);
  } else {
    response = fetch(`${BASE_URL}${url}`, requestConfig);
  }
  return response;
};

const useGet = (queryKey: [string, ...any[]], url: string, params: string | '' = '', needAuth = false) => {
  return useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      try {
        const respone = await makeRequest(url, 'GET', params, needAuth);
        return respone.json() as Promise<CustomeResponse>;
      } catch (error) {
        throw new Error('Failed to fetch ' + queryKey[0]);
      }
    },
  });
};
const usePost = (queryKey: [string, ...any[]], url: string, params: object | {} = {}, needAuth = false) => {
  return useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      try {
        const respone = await makeRequest(url, 'POST', params, needAuth);
        return respone.json() as Promise<CustomeResponse>;
      } catch (error) {
        throw new Error('Failed to fetch ' + queryKey[0]);
      }
    },
    enabled: true,
    retry: 3,
    staleTime: 0,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchOnMount: true,
  });
};
const usePut = (queryKey: [string, ...any[]], url: string, params: object | {} = {}, needAuth = false) => {
  return useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      makeRequest(url, 'PUT', params, needAuth).then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch ' + queryKey[0]);
        }
        return res.json() as Promise<CustomeResponse>;
      });
    },
  });
};
const useDelete = (queryKey: [string, ...any[]], url: string, params: string | '' = '', needAuth = false) => {
  return useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      makeRequest(url, 'DELETE', params, needAuth).then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch ' + queryKey[0]);
        }
        return res.json() as Promise<CustomeResponse>;
      });
    },
  });
};

export { useGet, usePost, usePut, useDelete };
