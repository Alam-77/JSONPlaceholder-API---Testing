/**
 * JSONPlaceholder Pre-request Scripts
 * 可复用的 Pre-request Script 示例
 */

// ========== 1. 动态设置时间戳 ==========
// Collection-level Pre-request Script
// 为每次请求添加时间戳，便于追踪
pm.environment.set("request_timestamp", new Date().toISOString());

// ========== 2. 动态生成随机测试数据 ==========
// 生成随机文章数据
function generatePostData() {
    const randomId = Math.floor(Math.random() * 10000);
    return {
        title: `Test Post Title ${randomId}`,
        body: `This is a test body generated at ${new Date().toISOString()}. Random ID: ${randomId}`,
        userId: Math.floor(Math.random() * 10) + 1
    };
}

// 生成随机待办数据
function generateTodoData() {
    const randomId = Math.floor(Math.random() * 10000);
    return {
        title: `Test Todo ${randomId}`,
        completed: Math.random() > 0.5,
        userId: Math.floor(Math.random() * 10) + 1
    };
}

// 将生成的数据设置到环境变量
if (pm.request.url.path.includes("posts") && pm.request.method === "POST") {
    const postData = generatePostData();
    pm.environment.set("dynamic_post_title", postData.title);
    pm.environment.set("dynamic_post_body", postData.body);
    pm.environment.set("dynamic_post_userId", postData.userId.toString());
}

if (pm.request.url.path.includes("todos") && pm.request.method === "POST") {
    const todoData = generateTodoData();
    pm.environment.set("dynamic_todo_title", todoData.title);
    pm.environment.set("dynamic_todo_completed", todoData.completed.toString());
    pm.environment.set("dynamic_todo_userId", todoData.userId.toString());
}

// ========== 3. 请求计数器 ==========
// 统计当前 Collection Run 中的请求次数
let requestCount = pm.environment.get("request_count") || 0;
requestCount++;
pm.environment.set("request_count", requestCount.toString());

// ========== 4. 请求耗时起始点 ==========
pm.environment.set("request_start_time", Date.now().toString());

// ========== 5. 日志输出 ==========
console.log(`[${requestCount}] ${pm.request.method} ${pm.request.url}`);
console.log(`Timestamp: ${pm.environment.get("request_timestamp")}`);
