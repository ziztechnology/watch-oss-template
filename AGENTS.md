# AGENTS.md

## Project Structure

- Place page components in `src/pages`. Each route page must use its own PascalCase directory with `index.tsx` as its entry point, for example, `src/pages/Home/index.tsx`.
- Page components must use default exports.
- Place layout components in `src/layouts`. Layout files must use PascalCase names ending in `Layout.tsx`, for example, `src/layouts/HomeLayout.tsx`.
- Layout components must render child routes using TanStack Router's `Outlet`.
- This project uses TanStack Router with code-based route configuration. Place route definitions in `src/router`, assemble the route tree in `src/router/index.ts`, and export `router` from there.
- Each application route must use its own kebab-case `.ts` file and export a `createXxxRoute` factory function for assembling the route tree.
- Use the `@/` alias when importing modules across directories within `src`.

## Styling and Static Assets

- Define styles using Tailwind CSS v4 and follow Tailwind CSS v4 best practices.
- Place static assets included in the build in `src/assets` and import them in `.tsx` files using `import`. Do not place these assets in `public` and reference them via URLs.

## Formatting

After completing coding tasks, you must run `pnpm lint` and `pnpm fmt`.
