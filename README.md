# JSONPlaceholder API 专项测试

> 基于 [JSONPlaceholder](https://jsonplaceholder.typicode.com/) 的 REST API 接口测试项目，使用 **Postman** 对 6 大资源进行全面的 CRUD 测试。

## 项目背景

JSONPlaceholder 是一个免费的在线 REST API，提供 `/posts`、`/comments`、`/albums`、`/photos`、`/todos`、`/users` 六大资源，支持标准 CRUD 操作。本项目使用 Postman 对其进行全面的接口测试，验证功能正确性、数据完整性、边界条件及异常处理能力。

## 技术栈

| 类别 | 技术 |
|------|------|
| API 测试工具 | Postman |
| 版本控制 | Git / GitHub |

## 测试设计思路

采用 **6 个资源 × CRUD 操作 × 正常/异常场景 + 高级场景** 的测试设计方法：

### 资源覆盖

| 资源 | 说明 | 数据量 |
|------|------|--------|
| /posts | 文章 | 100 条 |
| /comments | 评论 | 500 条 |
| /albums | 相册 | 100 条 |
| /photos | 照片 | 5000 条 |
| /todos | 待办 | 200 条 |
| /users | 用户 | 10 条 |

### CRUD 操作

- **GET 列表**：获取全部资源，验证数据量和结构
- **GET 单条**：按 ID 获取单条记录
- **POST 创建**：创建新资源，验证返回值
- **PUT 全量更新**：替换整个资源
- **PATCH 部分更新**：仅更新指定字段
- **DELETE 删除**：删除资源

### 场景分类

- **正常场景**：合法请求，验证状态码和响应结构
- **异常场景**：不存在的 ID（404）、空请求体、缺失字段
- **高级场景**：
  - **分页**：`?_start=0&_limit=10`、`?_page=1&_limit=10`
  - **嵌套**：`/posts/1/comments`、`/albums/1/photos`、`/users/1/posts`
  - **过滤**：`?postId=1`、`?userId=1`、`?albumId=1`
  - **自动生成数据**：Pre-request Script 生成随机 title

### 断言策略（每个请求 4 类断言）

1. **状态码校验**：200 / 201 / 404
2. **响应结构校验**：字段存在性（`to.have.property`）
3. **数据类型校验**：字段类型（`to.be.a('string')` / `to.be.a('number')`）
4. **字段值校验**：请求与响应数据一致性、枚举值匹配

## 项目结构

```
JSONPlaceholder API 专项测试/
├── README.md                                    # 项目概述
├── docs/
│   ├── test_matrix.md                           # 测试矩阵（Markdown）
│   ├── test_cases.md                            # 测试用例文档（Markdown）
│   ├── test_cases.xlsx                          # 测试用例 Excel
│   └── 测试矩阵.xlsx                             # 测试矩阵 Excel
├── postman/
│   ├── JSONPlaceholder_API_Collection.json      # Postman 集合（43 个请求）
│   └── JSONPlaceholder_Environment.json         # 环境变量
├── scripts/
│   └── pre_request_scripts.js                   # Pre-request 脚本
├── bugs/
│   ├── bug_report.md                            # Bug 报告（Markdown）
│   └── Bug报告.docx                             # Bug 报告（Word）
└── reports/
    ├── test_report.md                           # 测试报告（Markdown）
    └── 测试报告.docx                             # 测试报告（Word）
```

## 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/<your-username>/JSONPlaceholder-API-Testing.git
cd JSONPlaceholder-API-Testing
```

### 2. 使用 Postman

#### 2.1 导入 Collection 和 Environment

1. 打开 Postman
2. 点击 **Import** → 选择 `postman/JSONPlaceholder_API_Collection.json`
3. 再次点击 **Import** → 选择 `postman/JSONPlaceholder_Environment.json`

#### 2.2 配置环境变量

1. 点击 Postman 右上角的环境选择下拉框
2. 选择 **JSONPlaceholder Environment**
3. 点击 **眼睛图标** → **Edit** 查看/编辑变量：
   - `base_url`：`https://jsonplaceholder.typicode.com`（默认值，无需修改）
   - `post_id`：`1`
   - `random_title`：由 Pre-request Script 自动生成

#### 2.3 使用 Collection Runner 批量执行

1. 点击 Postman 顶部 **Runner** 按钮（或 `Ctrl+Shift+R`）
2. 选择 **JSONPlaceholder API 专项测试** Collection
3. 选择 **JSONPlaceholder Environment** 环境
4. 配置参数：
   - **Iterations**：1（默认）
   - **Delay**：0 ms（或按需设置请求间隔）
   - **Data File**：可选，用于数据驱动测试
5. 点击 **Run** 执行
6. 查看执行结果：通过/失败统计、响应时间、断言详情

## 测试结果摘要

| 指标 | 数值 |
|------|------|
| 测试场景数 | 50+ |
| 请求数 | 43 |
| 请求数/文件夹 | Posts: 9, Comments: 6, Albums: 8, Photos: 5, Todos: 8, Users: 7 |
| 每请求断言数 | 4 类（状态码/结构/类型/值） |
| 环境变量 | 8 个（base_url, post_id, random_title 等） |

## 联系方式

如有问题或建议，请通过以下方式联系：
- 邮箱: alam77777@qq.com

## 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 致谢

- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) - 提供免费的在线 REST API
- [Postman](https://www.postman.com/) - API 测试工具
- [Python](https://www.python.org/) - 脚本语言