# 商家模式 v1 开发计划

## 摘要

商家模式作为现有 new-api 的独立上游层：

- 一个商家对应一个现有 `user`
- 商家可配置多个自己的上游渠道，渠道配置由商家独立管理
- 平台用户继续使用现有 `/v1/...` 主入口
- 每个 `API Key(Token)` 可配置：
  - 绑定某个商家
  - 或不绑定商家，继续走平台原本服务
- 绑定商家后，请求只在该商家名下独立渠道中路由
- 不绑定时，完全兼容现有平台逻辑
- 商家固定 `default` 分组、固定 `1x` 倍率
- 商家可配置自己的模型价格，优先于平台价格

前端只做 `web/default`。

## 关键设计

### 数据模型

新增表，不改已有核心表：

- `merchants`
- `merchant_channels`
- `merchant_token_bindings`
- `merchant_model_prices`
- `merchant_settlements`

`merchant_channels` 是商家的独立上游渠道配置表，不是平台 `channels` 的关联表。

商家渠道必须独立保存：

- 渠道名称
- 渠道类型
- 上游 Key
- Base URL
- 支持模型
- 分组
- 优先级
- 权重
- 模型映射、参数覆盖、请求头覆盖等转发配置

禁止使用 `merchant_channels.channel_id` 绑定平台渠道。

### 平台渠道与商家渠道边界

- 平台 Token：继续使用原 `channels` + `abilities`
- 商家 Token：只使用 `merchant_channels`
- 商家渠道的启停、Key、模型、优先级、权重由商家自己管理
- 商家渠道不参与平台渠道列表、平台渠道测试、平台渠道能力表
- 商家渠道停用或自动禁用不得修改平台 `channels`

### Token 选择逻辑

- Token 未绑定商家：走平台原逻辑
- Token 绑定商家：只走该商家独立渠道池
- 商家价格优先，缺失时回退平台价格

### 路由与转发

外部入口不变，继续用现有 `/v1/...`。

内部仅增加：

1. Token 读取商家绑定
2. 渠道筛选按“平台模式 / 商家模式”分流
3. 商家模式查询 `merchant_channels`，不读取平台 `channels` / `abilities`
4. 计费价格按商家优先

## 实现变化

### 后端

新增独立模块：

- `model/merchant/*`
- `service/merchant/*`
- `controller/merchant/*`
- `router/merchant.go`

新增接口：

- `/api/merchant/self`
- `/api/merchant/channels`
- `/api/merchant/channels/:id`
- `/api/merchant/prices`
- `/api/merchant/settlements`
- `/api/merchant/admin/merchants`
- `/api/merchant/admin/settlements`
- `/api/merchant/admin/tokens/:id/binding`

必要的少量现有链路改动：

- Token 查询附带商家绑定
- Relay 上下文增加 `merchant_id`
- 渠道筛选增加商家分流
- 价格结算增加商家优先级

### 前端（仅 `web/default`）

新增一级菜单：

- `Merchant Center`
- `Merchant Admin`

新增页面：

- 商家概览
- 商家独立渠道管理
- 商家模型价格管理
- 商家结算页
- 管理员商家管理页
- 管理员商家结算页
- Token 商家绑定页/弹窗

Token 绑定交互：

- 平台默认服务
- 指定商家

## 测试计划

- 商家与用户一对一约束
- Token 未绑定时走平台逻辑
- Token 绑定商家后只命中商家独立渠道
- 商家价格优先，缺失回退平台价格
- 商家渠道固定 `default` 分组
- 商家渠道不会出现在平台 Channel 页面
- 商家渠道停用不会修改平台 `channels`
- SQLite / MySQL / PostgreSQL 迁移通过
- `web/default` 构建通过

## 假设与默认值

- 只改 `web/default`，不动 classic 前端
- 一个商家绑定一个用户
- 一个 Token 最多绑定一个商家
- Token 不绑定商家时，完全兼容当前平台逻辑
- v1 不做自有客户体系、表达式计费、多级分销、自动提现、商家认证
- 商家归属、商家渠道和 Token 绑定全部通过新表实现，避免重改 `channel`、`token` 主表
