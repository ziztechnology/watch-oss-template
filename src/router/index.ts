import { createHashHistory, createRootRoute, createRoute, createRouter, redirect } from '@tanstack/react-router';
import HomeLayout from '@/layouts/HomeLayout';
import { createHomeRoute } from './home';

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootRoute = createRootRoute({
  component: HomeLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => {
    throw redirect({ to: '/home' });
  },
});

const homeRoute = createHomeRoute(rootRoute);

const routeTree = rootRoute.addChildren([indexRoute, homeRoute]);

export const router = createRouter({
  routeTree,
  history: createHashHistory(),
});
