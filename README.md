# Toooony H5 Watch Face Template

Toooony 表盘模板，基于 React 和 Tailwind CSS。已集成最新版本 SDK 和对应的 Agent Skills 方便 Vibe Coding。

## 前置条件

- 需要安装 Node.js 24.x 以上版本
- 需要安装 [pnpm](https://pnpm.io/)

## 快速开始

### 克隆并安装

```bash
git clone https://github.com/ziztechnology/watch-oss-template
cd watch-oss-template
pnpm install
```

### 使用 AI 编程工具开发

本项目已在 `.agents/skills` 目录中内置开发所需的 Skills，涵盖代码规范、React 开发规范、表盘开发注意事项及 SDK 使用指南，无需额外下载或安装。
可使用 OpenCode、Codex、Claude Code，以及其他支持 Agent Skills 的 AI 编程工具进行开发。完成以下步骤后即可开始：

1. 使用 AI 编程工具打开项目根目录，也就是包含 `package.json` 的目录。
2. 直接用自然语言告诉 AI 你想做什么。

例如：

```text
制作一个简洁的数字表盘，显示时间、日期、步数和电量。
请使用项目中已经集成的 Skill，并遵守其中的开发规范。
```

AI 会根据项目中的 Skill 了解这个项目应该怎样组织代码、怎样适配 480 × 480 的圆形表盘，以及怎样使用表盘 SDK。你不需要先学会写复杂的提示词，把想要的界面和功能说清楚即可。

> [!TIP]
> 如果 AI 没有自动读取 Skill，可以再告诉它：`请先阅读 .agents/skills 目录中的 Skill，然后再开始修改代码。`

### 本地预览

```bash
pnpm dev
```

### 编译

```bash
pnpm build
```

### 打包

> [!NOTE]
> 打包前应当通过 `pnpm build`

```bash
pnpm package
```

### 使用

点开我们的开放平台以上传自己的表盘。
