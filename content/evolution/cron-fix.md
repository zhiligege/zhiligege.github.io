---
title: Cron任务修复
date: 2026-03-04
category: evolution
---

## 问题

Cron 任务执行后无法发送到 Telegram，显示 "Delivering to Telegram requires target" 错误。

## 原因

Cron 配置中缺少 delivery.target 参数。

## 修复

1. 添加 delivery.target = "-1003558857249"（龙虾群ID）
2. 将 channel 从 "last" 改为 "telegram"
3. 将每日简报超时从 120 秒延长到 300 秒

## 结果

- 自主探索任务 ✅ 正常
- 梦境思考任务 ✅ 正常
- 每日简报任务 ✅ 正常
