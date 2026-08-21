import { isHTTPError, isNetworkError, isTimeoutError } from 'ky';
import type { BeforeErrorHook, HTTPError } from 'ky';
import type { JsonObject } from 'ts-essentials';

import { showRequestErrorMessage } from './request-message';

const NETWORK_ERROR_MESSAGE_KEY = 'network-error';
const NETWORK_ERROR_MESSAGE = '网络连接失败，请检查网络后重试。';
const TIMEOUT_ERROR_MESSAGE = '请求超时，请检查网络连接后重试。';

const isJsonObject = (value: unknown): value is JsonObject => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

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

export const beforeError: BeforeErrorHook[] = [
  ({ error }) => {
    if (isHTTPError(error)) {
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
