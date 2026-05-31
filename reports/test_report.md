# JSONPlaceholder API 专项测试报告

---

## 一、测试概述

| 项目 | 内容 |
|------|------|
| 项目名称 | JSONPlaceholder API 专项测试 |
| 测试环境 | https://jsonplaceholder.typicode.com |
| 测试工具 | Postman |
| 测试人员 | 黄沛霖 |
| 测试日期 | 2026-05-29 |
| 测试版本 | v1.0 |

---

## 二、测试结果汇总

**本次测试共覆盖 50+ 条测试场景，通过 Collection Runner 批量执行，全部通过。**

### 2.1 按模块统计

| 模块 | 请求数 | 测试场景 |
|------|--------|----------|
| Posts | 9 | CRUD + 分页 + 嵌套 + 自动生成数据 |
| Comments | 6 | 列表/单条/分页/过滤/404 |
| Albums | 8 | CRUD + 嵌套 + 自动生成数据 |
| Photos | 5 | 列表/单条/分页/过滤/404 |
| Todos | 8 | CRUD + 过滤 + 自动生成数据 |
| Users | 7 | 列表/单条/404/邮箱校验/嵌套关联 |
| **合计** | **43** | **50+ 条测试场景** |

### 2.2 按场景类型统计

| 类型 | 说明 |
|------|------|
| 正常场景 | CRUD 操作、状态码校验、数据完整性 |
| 异常场景 | 404 响应、不存在的 ID |
| 高级场景 | 分页（_start/_limit、_page/_limit）、过滤（postId/userId/albumId）、嵌套资源路由 |
| 自动生成数据 | Pre-request Script 生成随机 title |

---

## 三、测试覆盖范围

| 资源 | GET(列表) | GET(单条) | POST | PUT | PATCH | DELETE | 嵌套/过滤 |
|------|:---------:|:---------:|:----:|:---:|:-----:|:------:|:---------:|
| /posts | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | /posts/:id/comments |
| /comments | ✓ | ✓ | - | - | - | - | ?postId=1 |
| /albums | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | /albums/:id/photos |
| /photos | ✓ | ✓ | - | - | - | - | ?albumId=1 |
| /todos | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ?userId=1 |
| /users | ✓ | ✓ | - | - | - | - | /users/:id/posts,albums,todos |

---

## 四、断言策略

每个请求包含 4 类断言：

1. **状态码校验**：验证 HTTP 响应码为 200 / 201 / 404
2. **响应结构校验**：验证返回数据包含必要字段（`to.have.property`）
3. **数据类型校验**：验证字段类型正确（`to.be.a('string')` / `to.be.a('number')`）
4. **字段值校验**：验证请求与响应数据一致（如创建文章的 title 与返回的 title 一致）

---

## 五、发现的问题

本次测试发现 **5 个问题**，均为 JSONPlaceholder Mock API 的已知设计限制，非被测系统真实缺陷。

| 编号 | 模块 | 严重程度 | 标题 | 状态 |
|------|------|----------|------|------|
| BUG-001 | Posts | 中 | POST /posts 缺少必填字段仍返回201 | 已确认(API设计如此) |
| BUG-002 | Todos | 低 | PUT /todos 返回数据不含请求体中的title | 已确认(API模拟行为) |
| BUG-003 | Comments | 低 | POST /comments 未持久化创建的评论 | 已确认(Mock API限制) |
| BUG-004 | 全局 | 低 | POST/PUT/PATCH/DELETE 操作不持久化 | 已确认(Mock API设计) |
| BUG-005 | Users | 信息 | 用户geo坐标精度不足 | 建议(Mock数据质量) |

> 详细 Bug 描述见 `bug_report.md`

---

## 六、测试结论

1. JSONPlaceholder API 的六大资源（posts、comments、albums、photos、todos、users）的读取接口功能正常，数据结构完整。
2. 支持写操作的资源（posts、albums、todos）的 CRUD 接口响应正确，状态码符合 RESTful 规范。
3. 嵌套资源路由（如 `/users/1/posts`、`/posts/1/comments`）工作正常，数据关联关系正确。
4. 分页和过滤功能正常（`_start/_limit`、`_page/_limit`、`?postId=`、`?userId=`、`?albumId=`）。
5. 每个请求均包含 4 类断言（状态码/结构/类型/值），断言覆盖完整。
6. 发现的问题均为 Mock API 的设计特点，不影响对 API 测试方法论的验证。

**综合评估：通过**

---

## 七、附件

- `test_cases.xlsx` — 测试用例 Excel 文件（含统计汇总和 Bug 清单）
- `postman/JSONPlaceholder_API_Collection.json` — Postman 测试集合（43 个请求）
- `postman/JSONPlaceholder_Environment.json` — 环境变量配置
