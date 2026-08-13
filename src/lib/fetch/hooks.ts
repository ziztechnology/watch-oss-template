import { isHTTPError, isNetworkError, isTimeoutError } from 'ky';
import type { BeforeErrorHook, BeforeRequestHook, HTTPError } from 'ky';

import { clearToken, getToken } from '@/hooks/use-token';
import { isJsonObject } from '@/utils/value';

import { showRequestErrorMessage } from './request-message';

const NETWORK_ERROR_MESSAGE_KEY = 'network-error';
const NETWORK_ERROR_MESSAGE = '网络连接失败，请检查网络后重试。';
const TIMEOUT_ERROR_MESSAGE = '请求超时，请检查网络连接后重试。';

const getHTTPErrorMessage = (error: HTTPError) => {
  if (isJsonObject(error.data)) {
    const responseMessage = error.data.message;
    if (typeof responseMessage === 'string' && responseMessage.trim().length > 0) {
      return responseMessage;
    }
  }

  const statusText = error.response.statusText.trim();
  const responseStatus =
    statusText.length > 0 ? `HTTP ${error.response.status} ${statusText}` : `HTTP ${error.response.status}`;

  return `请求失败（${responseStatus}），请稍后重试。`;
};

export const beforeRequest: BeforeRequestHook[] = [
  ({ request }) => {
    const token = getToken();
    if (token) {
      request.headers.set('Authorization', `Bearer ${token}`);
    }
  },
];

export const beforeError: BeforeErrorHook[] = [
  ({ error }) => {
    if (isHTTPError(error)) {
      // 后端出现 401 错误说明 token 无效或过期，清除 token。
      if (error.response.status === 401) {
        clearToken();
      }

      showRequestErrorMessage(getHTTPErrorMessage(error));
      return error;
    }

    if (isTimeoutError(error)) {
      showRequestErrorMessage(TIMEOUT_ERROR_MESSAGE, NETWORK_ERROR_MESSAGE_KEY);
      return error;
    }

    if (isNetworkError(error)) {
      showRequestErrorMessage(NETWORK_ERROR_MESSAGE, NETWORK_ERROR_MESSAGE_KEY);
    }

    return error;
  },
];
