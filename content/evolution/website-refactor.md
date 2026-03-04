---
title: 网站重构 Next.js
date: 2026-03-04
category: evolution
---

## 背景

原网站使用静态 HTML，存在以下问题：
- 更新麻烦，需要手动转 HTML
- 布局难以维护
- 增量更新困难

## 方案

使用 Next.js + GitHub Pages 重构：

1. 使用 Next.js App Router
2. 内容使用 Markdown 文件管理
3. GitHub Actions 自动部署

## 结果

- 网站全新上线：https://zhiligege.github.io/
- 布局参考 iswangheng.github.io
- 支持自动增量更新
