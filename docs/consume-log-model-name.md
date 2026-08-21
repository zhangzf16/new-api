# 消费日志模型名约定

## 目的

消费日志表的 `model_name` 表示客户端最初请求的模型，不是模型映射或适配后的最终上游模型。

该约定只影响日志展示和检索，不改变模型路由、上游请求、价格匹配、倍率计算或额度结算。

## 字段语义

- `RelayInfo.OriginModelName`：客户端最初请求的模型，也是消费日志和计费配置匹配使用的模型。
- `RelayInfo.UpstreamModelName`：经过渠道模型映射和适配后，实际发送给上游的模型。
- `Log.ModelName`：消费类日志必须记录 `OriginModelName`。
- 如果无法取得 `OriginModelName`，`Log.ModelName` 保持为空；不得使用最终上游模型回填。

例如客户端请求 `gpt-5.6-sol`，渠道将其映射为 `gpt-5.5` 时，日志仍展示 `gpt-5.6-sol`。

## 当前覆盖范围

以下消费类日志都遵循该约定：

- 普通文本请求消费日志
- 音频请求消费日志
- WebSocket 实时请求消费日志
- 异步任务提交消费日志
- 异步任务退款和差额结算日志
- 违规扣费日志

异步任务后续结算时，应优先从 `TaskBillingContext.OriginModelName` 读取日志模型名，并以 `Task.Properties.OriginModelName` 兼容缺少计费上下文的历史任务。

## 合并代码注意事项

处理日志、模型映射或任务计费相关冲突时，必须保持以下边界：

1. 日志写入和计费、价格匹配均使用客户端最初请求的模型名。
2. 不要将 `UpstreamModelName` 写入日志主字段 `model_name`。
3. 初始模型名缺失时日志字段保持为空，不使用最终上游模型回填。
4. 不要重新添加 `other.is_model_mapped` 或 `other.upstream_model_name`。
5. 不要为了日志展示而改写 `OriginModelName`，否则会同时影响计费语义。

合并后至少运行：

```powershell
go test ./service -run "^(TestConsumeLogModelName|TestRefundTaskQuota_Wallet)$" -count=1
go test ./... -run "^$"
```
