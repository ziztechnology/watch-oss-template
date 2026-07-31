# AGENTS.md

## 规则

- 参考 Tailwind CSS v4 最佳实践来定义样式。
- 静态文件存放在 `src/assets` 目录下在 `.tsx` 中通过 `import` 导入，而不是存放在 `public` 目录下通过 URL 引入。

## 格式化

编码任务完成后需要通过 `pnpm lint` `pnpm fmt` 对代码进行 Linter 和格式化操作。
