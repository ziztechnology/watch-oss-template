import { Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import type { FC } from 'react';

import { RequestMessageBridge } from '@/lib/fetch/RequestMessageBridge';

const HomeLayout: FC = () => {
  return (
    <>
      <RequestMessageBridge />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
};

export default HomeLayout;
