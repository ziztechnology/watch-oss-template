import ky, { type Options } from 'ky';
import type { JsonObject } from 'ts-essentials';

import { beforeError, beforeRequest } from './hooks';

const getAPIBaseURL = () => {
  const apiBaseURL = import.meta.env.VITE_BASE_API?.trim();

  if (!apiBaseURL) {
    throw new Error('缺少 BASE_API 环境变量。');
  }

  return apiBaseURL;
};

const apiBaseURL = getAPIBaseURL();

export const instance = ky.create({
  prefix: apiBaseURL,
  hooks: {
    beforeRequest,
    beforeError,
  },
  headers: {
    'X-Toooony-Client': 'open-platform',
  },
});

export const http = {
  get: (url: string, options?: Options) => instance.get(url, options).json<JsonObject>(),
  post: (url: string, options?: Options) => instance.post(url, options).json<JsonObject>(),
  put: (url: string, options?: Options) => instance.put(url, options).json<JsonObject>(),
  delete: (url: string, options?: Options) => instance.delete(url, options).json<JsonObject>(),
  patch: (url: string, options?: Options) => instance.patch(url, options).json<JsonObject>(),
} as const;
