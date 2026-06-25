# MERCHANT_MARKET_RULES.md

# Merchant Market 开发约束（必须遵守）

## 项目背景

本项目基于 QuantumNous/new-api Fork 开发。

目标：

* 保持能够长期同步 upstream(new-api) 更新。
* 新增「商家服务市场」功能。
* 尽可能减少与官方代码冲突。

任何开发都必须遵守本文档。

---

# 一、禁止修改范围（必须遵守）

Agent **禁止修改** 以下模块：

* 登录
* 注册
* OAuth
* 用户中心
* Token 管理
* 渠道(Channel)
* 模型(Model)
* 日志(Log)
* 充值
* 余额
* 配额
* 请求转发
* OpenAI API
* Anthropic API
* Gemini API
* Response API
* 管理后台已有功能

除非明确收到新的开发指令，否则不得修改。

---

# 二、允许新增

允许新增：

```
Merchant（商家）
Merchant Service（服务）
Marketplace（服务市场）
Settlement（结算）
Merchant Dashboard（商家后台）
```

新增代码必须放到新的模块。

例如：

```
web/src/pages/merchant
web/src/pages/market

controller/merchant
controller/market

router/merchant.go

model/merchant

service/merchant
```

禁止把大量代码塞到已有目录。

---

# 三、数据库原则

禁止修改已有表结构。

例如：

```
channel
token
logs
quota
user
redemption
```

除非绝对必要。

商家功能必须建立新的数据表。

建议：

```
merchant

merchant_service

merchant_endpoint

merchant_price

merchant_usage_log

merchant_order

merchant_settlement
```

不得向 channel 表增加大量业务字段。

---

# 四、页面原则

禁止直接改造已有页面。

例如：

```
Channel 页面

Token 页面

Model 页面

Log 页面
```

最多允许：

* 新增一个导航入口
* 新增一个菜单

业务全部进入：

```
Marketplace
Merchant Center
```

不得影响原有页面逻辑。

---

# 五、接口原则

新增接口必须：

```
/api/merchant/...

/api/market/...
```

不要修改已有：

```
/api/channel
/api/token
/api/model
```

---

# 六、业务原则

Marketplace 是一个独立业务。

它不是：

* Channel 的扩展
* Token 的扩展
* Model 的扩展

不得将 Marketplace 的业务直接耦合到已有逻辑。

---

# 七、代码原则

新增功能优先：

新增文件

新增目录

新增 Service

新增 Controller

新增 Router

避免修改已有文件。

如果必须修改已有文件：

一次 PR 修改不超过 30 行。

---

# 八、UI 原则

新增：

```
Marketplace
Merchant Center
```

作为一级菜单。

禁止：

把 Marketplace 做进：

* Channel
* Token
* Setting
* Dashboard

页面中。

---

# 九、兼容 Upstream

开发必须满足：

未来能够：

```
git fetch upstream

git merge upstream/main
```

尽量减少冲突。

任何设计都优先考虑：

**降低 Fork 与 Upstream 的差异。**

---

# 十、提交原则

每个功能保持独立。

例如：

```
feat(merchant): merchant model

feat(merchant): merchant router

feat(merchant): merchant dashboard

feat(market): marketplace page

feat(market): service detail
```

不要把多个功能混在一次提交。

---

# 十一、未来规划（暂不开发）

以下功能仅预留，不实现：

* 服务评分
* 服务搜索
* 服务推荐
* 服务排行榜
* 优惠券
* 订阅套餐
* 自动提现
* 多级分销
* 商家认证
* API SLA
* API 限流策略
* 多租户

---

# 十二、最高原则

> **优先新增，而不是修改。**

> **优先解耦，而不是耦合。**

> **优先独立模块，而不是侵入官方模块。**

任何实现方案，都必须满足：

1. 最小修改官方代码。
2. 新业务全部独立。
3. 保证未来能够持续同步 upstream。
4. 不影响 New API 原有功能。
