import express from "express";
import bodyParser from "body-parser";
import { createClient } from "@supabase/supabase-js";
import cors from "cors";

// 导入路由模块
import blogGetRoute from "../../backend_service/routers/blog/getBlogInformation.js";
import blogSetRoute from "../../backend_service/routers/blog/setBlogInformation.js";
import blogDelRoute from "../../backend_service/routers/blog/delBlogInformation.js";
import blogPublishRoute from "../../backend_service/routers/blog/blogPublish.js";

const app = express();

// 启用 CORS 中间件，允许所有来源访问
app.use(cors());

// 使用 body-parser 解析 JSON 请求
app.use(bodyParser.json());

// 初始化 Supabase 客户端
const supabase = createClient(
    process.env.SUPABASE_URL, // 你的 Supabase URL
    process.env.SUPABASE_KEY  // 你的 Supabase 密钥
);

// 测试数据库连接
async function testConnection() {
    const { data, error } = await supabase.from('todos').select();
    if (error) {
        console.error("Error connecting to Supabase:", error);
    } else {
        console.log("Connected to Supabase. Data:", data);
    }
}

// 测试连接
testConnection();

// 默认路由
app.get("/api/v1/blog", (req, res) => {
    res.status(200).json({
        message: "Welcome to the Blog API",
        availableRoutes: {
            getBlogs: "/api/v1/blog/get",
            setBlog: "/api/v1/blog/set",
        },
    });
});

// 将 supabase 实例传递给路由模块
app.use("/api/v1/blog", blogGetRoute(supabase));
app.use("/api/v1/blog", blogSetRoute(supabase));
app.use("/api/v1/blog", blogDelRoute(supabase));
app.use("/api/v1/blog", blogPublishRoute(supabase));

// 导出应用为 Serverless 函数
export default (req, res) => {
    app(req, res);  // 处理所有请求
};
