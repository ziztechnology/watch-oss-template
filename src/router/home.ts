import { createRoute, type AnyRoute } from '@tanstack/react-router';

import HomePage from '@/pages/Home/index';

export const createHomeRoute = <TParentRoute extends AnyRoute>(parentRoute: TParentRoute) => {
  return createRoute({
    getParentRoute: () => parentRoute,
    path: '/home',
    component: HomePage,
  });
};
