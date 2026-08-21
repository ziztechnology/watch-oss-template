export interface RequestMessageOptions {
  content: string;
  duration: number;
  key?: string;
}

export interface RequestMessageAPI {
  error: (options: RequestMessageOptions) => void;
}

let requestMessageAPI: RequestMessageAPI | null = null;

export const registerRequestMessageAPI = (messageAPI: RequestMessageAPI) => {
  requestMessageAPI = messageAPI;
};

export const unregisterRequestMessageAPI = (messageAPI: RequestMessageAPI) => {
  if (requestMessageAPI === messageAPI) {
    requestMessageAPI = null;
  }
};

export const showRequestErrorMessage = (content: string, key?: string) => {
  requestMessageAPI?.error({
    content,
    duration: 5,
    ...(key === undefined ? {} : { key }),
  });
};
