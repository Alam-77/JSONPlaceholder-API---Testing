# 测试用例文档

> 共 50+ 条测试用例，覆盖 6 个资源的 CRUD 操作、边界条件、异常处理、分页/过滤/嵌套高级场景。

---

## 一、Posts 接口测试（12 条）

### TC-POST-001: 获取全部文章列表
- **优先级**: P0
- **前置条件**: 无
- **测试步骤**: GET /posts
- **预期结果**: 状态码 200，返回数组，长度 = 100

### TC-POST-002: 获取单篇文章
- **优先级**: P0
- **前置条件**: 无
- **测试步骤**: GET /posts/1
- **预期结果**: 状态码 200，id = 1，包含 title、body、userId 字段

### TC-POST-003: 获取不存在的文章（404）
- **优先级**: P1
- **前置条件**: 无
- **测试步骤**: GET /posts/99999
- **预期结果**: 状态码 404，响应体为空对象 {}

### TC-POST-004: 创建新文章
- **优先级**: P0
- **前置条件**: 无
- **测试步骤**: POST /posts，body: {title, body, userId}
- **预期结果**: 状态码 201，返回 id = 101，title/body/userId 与请求一致

### TC-POST-005: 分页获取文章（_start & _limit）
- **优先级**: P1
- **前置条件**: 无
- **测试步骤**: GET /posts?_start=0&_limit=10
- **预期结果**: 状态码 200，返回数组，长度 <= 10，第一条 id = 1

### TC-POST-005b: 创建文章 - 缺少必填字段
- **优先级**: P2
- **前置条件**: 无
- **测试步骤**: POST /posts，body: {title: "test"}
- **预期结果**: 状态码 201（JSONPlaceholder 不校验），返回数据中缺失字段为 undefined

### TC-POST-006: 全量更新文章
- **优先级**: P1
- **前置条件**: 无
- **测试步骤**: PUT /posts/1，body: {id: 1, title: "updated", body: "new body", userId: 1}
- **预期结果**: 状态码 200，title 和 body 已更新

### TC-POST-007: 部分更新文章
- **优先级**: P1
- **前置条件**: 无
- **测试步骤**: PATCH /posts/1，body: {title: "patched"}
- **预期结果**: 状态码 200，title 已更新，其他字段不变

### TC-POST-008: 删除文章
- **优先级**: P1
- **前置条件**: 无
- **测试步骤**: DELETE /posts/1
- **预期结果**: 状态码 200

### TC-POST-009: 获取文章的评论列表
- **优先级**: P1
- **前置条件**: 无
- **测试步骤**: GET /posts/1/comments
- **预期结果**: 状态码 200，返回数组，每条 comment 的 postId = 1

### TC-POST-010: 通过 postId 参数过滤评论
- **优先级**: P2
- **前置条件**: 无
- **测试步骤**: GET /comments?postId=1
- **预期结果**: 状态码 200，所有评论 postId = 1

### TC-POST-011: 文章列表数据完整性
- **优先级**: P1
- **前置条件**: 无
- **测试步骤**: GET /posts，遍历检查每条记录
- **预期结果**: 每条记录包含 id、title、body、userId，且均为正确类型

---

## 二、Comments 接口测试（8 条）

### TC-COM-001: 获取全部评论列表
- **优先级**: P0
- **测试步骤**: GET /comments
- **预期结果**: 状态码 200，返回数组，长度 = 500

### TC-COM-002: 获取单条评论
- **优先级**: P0
- **测试步骤**: GET /comments/1
- **预期结果**: 状态码 200，id = 1，包含 postId、name、email、body

### TC-COM-003: 获取不存在的评论
- **优先级**: P2
- **测试步骤**: GET /comments/99999
- **预期结果**: 状态码 404

### TC-COM-004: 评论数据完整性校验
- **优先级**: P1
- **测试步骤**: GET /comments，抽样检查字段
- **预期结果**: 每条记录包含 id(int)、postId(int)、name(str)、email(str)、body(str)

### TC-COM-004b: 分页获取评论（_page & _limit）
- **优先级**: P1
- **前置条件**: 无
- **测试步骤**: GET /comments?_page=1&_limit=10
- **预期结果**: 状态码 200，返回数组，长度 <= 10

### TC-COM-005: 通过 postId 过滤评论
- **优先级**: P1
- **测试步骤**: GET /comments?postId=1
- **预期结果**: 所有返回项 postId = 1

### TC-COM-006: 通过不存在的 postId 过滤
- **优先级**: P2
- **测试步骤**: GET /comments?postId=99999
- **预期结果**: 状态码 200，返回空数组 []

### TC-COM-007: 评论 email 格式校验
- **优先级**: P2
- **测试步骤**: GET /comments，检查 email 字段
- **预期结果**: 所有 email 符合标准邮箱格式

---

## 三、Albums 接口测试（10 条）

### TC-ALB-001: 获取全部相册列表
- **优先级**: P0
- **测试步骤**: GET /albums
- **预期结果**: 状态码 200，返回数组，长度 = 100

### TC-ALB-002: 获取单个相册
- **优先级**: P0
- **测试步骤**: GET /albums/1
- **预期结果**: 状态码 200，id = 1，包含 userId、title

### TC-ALB-003: 获取不存在的相册
- **优先级**: P2
- **测试步骤**: GET /albums/99999
- **预期结果**: 状态码 404

### TC-ALB-004: 创建新相册
- **优先级**: P1
- **测试步骤**: POST /albums，body: {title, userId}
- **预期结果**: 状态码 201，返回 id = 101

### TC-ALB-005: 全量更新相册
- **优先级**: P1
- **测试步骤**: PUT /albums/1
- **预期结果**: 状态码 200，数据已更新

### TC-ALB-006: 部分更新相册
- **优先级**: P1
- **测试步骤**: PATCH /albums/1，body: {title: "new title"}
- **预期结果**: 状态码 200，title 更新

### TC-ALB-007: 删除相册
- **优先级**: P1
- **测试步骤**: DELETE /albums/1
- **预期结果**: 状态码 200

### TC-ALB-008: 获取相册的照片列表
- **优先级**: P1
- **测试步骤**: GET /albums/1/photos
- **预期结果**: 状态码 200，返回数组，每张 photo 的 albumId = 1

### TC-ALB-009: 相册数据完整性
- **优先级**: P1
- **测试步骤**: GET /albums
- **预期结果**: 每条记录包含 id(int)、userId(int)、title(str)

---

## 四、Photos 接口测试（8 条）

### TC-PHO-001: 获取全部照片列表
- **优先级**: P0
- **测试步骤**: GET /photos
- **预期结果**: 状态码 200，返回数组，长度 = 5000

### TC-PHO-002: 获取单张照片
- **优先级**: P0
- **测试步骤**: GET /photos/1
- **预期结果**: 状态码 200，id = 1，包含 albumId、title、url、thumbnailUrl

### TC-PHO-003: 获取不存在的照片
- **优先级**: P2
- **测试步骤**: GET /photos/99999
- **预期结果**: 状态码 404

### TC-PHO-004: 分页获取照片（_page & _limit）
- **优先级**: P1
- **前置条件**: 无
- **测试步骤**: GET /photos?_page=1&_limit=10
- **预期结果**: 状态码 200，返回数组，长度 <= 10

### TC-PHO-005: 通过 albumId 过滤照片
- **优先级**: P1
- **测试步骤**: GET /photos?albumId=1
- **预期结果**: 所有返回项 albumId = 1

### TC-PHO-005: 照片 URL 格式校验
- **优先级**: P2
- **测试步骤**: GET /photos/1
- **预期结果**: url 和 thumbnailUrl 为合法 URL 格式

### TC-PHO-006: 照片数据完整性
- **优先级**: P1
- **测试步骤**: GET /photos，抽样检查
- **预期结果**: 每条记录包含 id(int)、albumId(int)、title(str)、url(str)、thumbnailUrl(str)

### TC-PHO-007: 通过不存在的 albumId 过滤
- **优先级**: P2
- **测试步骤**: GET /photos?albumId=99999
- **预期结果**: 状态码 200，返回空数组

---

## 五、Todos 接口测试（12 条）

### TC-TOD-001: 获取全部待办列表
- **优先级**: P0
- **测试步骤**: GET /todos
- **预期结果**: 状态码 200，返回数组，长度 = 200

### TC-TOD-002: 获取单个待办
- **优先级**: P0
- **测试步骤**: GET /todos/1
- **预期结果**: 状态码 200，id = 1，包含 userId、title、completed

### TC-TOD-003: 获取不存在的待办
- **优先级**: P2
- **测试步骤**: GET /todos/99999
- **预期结果**: 状态码 404

### TC-TOD-004: 创建新待办
- **优先级**: P1
- **测试步骤**: POST /todos，body: {userId, title, completed: false}
- **预期结果**: 状态码 201，返回 id = 201

### TC-TOD-005: 创建已完成的待办
- **优先级**: P2
- **测试步骤**: POST /todos，body: {userId, title, completed: true}
- **预期结果**: 状态码 201，completed = true

### TC-TOD-006: 全量更新待办
- **优先级**: P1
- **测试步骤**: PUT /todos/1
- **预期结果**: 状态码 200

### TC-TOD-007: 部分更新待办 - 标记完成
- **优先级**: P1
- **测试步骤**: PATCH /todos/1，body: {completed: true}
- **预期结果**: 状态码 200，completed = true

### TC-TOD-008: 删除待办
- **优先级**: P1
- **测试步骤**: DELETE /todos/1
- **预期结果**: 状态码 200

### TC-TOD-009: 待办 completed 字段类型校验
- **优先级**: P1
- **测试步骤**: GET /todos
- **预期结果**: 所有记录的 completed 为 boolean 类型

### TC-TOD-010: 待办数据完整性
- **优先级**: P1
- **测试步骤**: GET /todos
- **预期结果**: 每条记录包含 id(int)、userId(int)、title(str)、completed(bool)

### TC-TOD-011: 通过 userId 过滤待办
- **优先级**: P2
- **测试步骤**: GET /todos?userId=1
- **预期结果**: 所有返回项 userId = 1

---

## 六、Users 接口测试（8 条）

### TC-USR-001: 获取全部用户列表
- **优先级**: P0
- **测试步骤**: GET /users
- **预期结果**: 状态码 200，返回数组，长度 = 10

### TC-USR-002: 获取单个用户
- **优先级**: P0
- **测试步骤**: GET /users/1
- **预期结果**: 状态码 200，id = 1，包含 name、username、email

### TC-USR-003: 获取不存在的用户
- **优先级**: P2
- **测试步骤**: GET /users/99999
- **预期结果**: 状态码 404

### TC-USR-004: 用户 email 格式校验
- **优先级**: P2
- **测试步骤**: GET /users
- **预期结果**: 所有用户 email 符合标准邮箱格式

### TC-USR-005: 用户地址嵌套对象校验
- **优先级**: P1
- **测试步骤**: GET /users/1
- **预期结果**: address 包含 street、suite、city、zipcode、geo

### TC-USR-006: 用户公司嵌套对象校验
- **优先级**: P1
- **测试步骤**: GET /users/1
- **预期结果**: company 包含 name、catchPhrase、bs

### TC-USR-007: 用户数据完整性
- **优先级**: P1
- **测试步骤**: GET /users
- **预期结果**: 每条记录包含 id、name、username、email、phone、website

---

## 七、跨资源关联测试（4 条）

### TC-XRES-001: 用户 → 文章关联
- **优先级**: P1
- **测试步骤**: GET /users/1 → GET /users/1/posts
- **预期结果**: 返回文章列表，每条 userId = 1

### TC-XRES-002: 用户 → 相册关联
- **优先级**: P1
- **测试步骤**: GET /users/1 → GET /users/1/albums
- **预期结果**: 返回相册列表，每条 userId = 1

### TC-XRES-003: 用户 → 待办关联
- **优先级**: P1
- **测试步骤**: GET /users/1 → GET /users/1/todos
- **预期结果**: 返回待办列表，每条 userId = 1

### TC-XRES-004: 文章 → 评论关联
- **优先级**: P1
- **测试步骤**: GET /posts/1 → GET /posts/1/comments
- **预期结果**: 返回评论列表，每条 postId = 1
