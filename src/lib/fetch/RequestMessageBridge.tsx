import { useMount, useUnmount } from 'ahooks';
import { useEffect, useRef, useState } from 'react';
import type { FC } from 'react';
import type { JsonObject } from 'ts-essentials';

import { registerRequestMessageAPI, type RequestMessageAPI, unregisterRequestMessageAPI } from './request-message';

const INITIAL_COMPONENT_DATA: JsonObject = {
  content: null,
  duration: 0,
  messageVersion: 0,
};

export const RequestMessageBridge: FC = () => {
  const [componentData, setComponentData] = useState<JsonObject>(INITIAL_COMPONENT_DATA);
  const requestMessageAPIRef = useRef<RequestMessageAPI | null>(null);

  if (requestMessageAPIRef.current === null) {
    requestMessageAPIRef.current = {
      error: ({ content, duration }) => {
        setComponentData((previousData) => ({
          content,
          duration,
          messageVersion: typeof previousData.messageVersion === 'number' ? previousData.messageVersion + 1 : 1,
        }));
      },
    };
  }

  const requestMessageAPI = requestMessageAPIRef.current;
  const content = typeof componentData.content === 'string' ? componentData.content : null;
  const duration = typeof componentData.duration === 'number' ? componentData.duration : 0;
  const messageVersion = typeof componentData.messageVersion === 'number' ? componentData.messageVersion : 0;

  useMount(() => {
    registerRequestMessageAPI(requestMessageAPI);
  });

  useUnmount(() => {
    unregisterRequestMessageAPI(requestMessageAPI);
  });

  useEffect(() => {
    if (content === null || duration <= 0) {
      return;
    }

    const hideTimer = window.setTimeout(() => {
      setComponentData((previousData) => ({
        ...previousData,
        content: null,
      }));
    }, duration * 1000);

    return () => {
      window.clearTimeout(hideTimer);
    };
  }, [content, duration, messageVersion]);

  return content === null ? null : (
    <div
      className="pointer-events-none fixed inset-x-[15vw] top-[15vh] z-50 flex justify-center"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <p className="m-0 max-w-[70vw] rounded-[3vw] border border-white/15 bg-black/80 px-[4vw] py-[2.5vh] text-center text-[3.33vw] leading-[1.4] text-white shadow-lg backdrop-blur-sm">
        {content}
      </p>
    </div>
  );
};
