const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize } = require("sequelize");

const cors = require("cors")

// 导入路由模块
const blogGetRoute = require("./routers/blog/getBlogInformation");
const blogSetRoute = require("./routers/blog/setBlogInformation");
const blogDelRoute = require("./routers/blog/delBlogInformation");

const app = express();

// 启用 CORS 中间件，允许所有来源访问
app.use(cors());
const port = 3000;

// 使用 body-parser 解析 JSON 请求
app.use(bodyParser.json());

// 初始化 MySQL 数据库连接（全局共享）
const sequelize = new Sequelize("blog", "root", "linncharm", {
    host: "127.0.0.1",
    dialect: "mysql",
});

// 测试数据库连接
sequelize.authenticate()
    .then(() => {
        console.log("Database connected!");
    })
    .catch((error) => {
        console.error("Unable to connect to the database:", error);
    });

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

// 将 sequelize 实例传递给路由模块
app.use("/api/v1/blog", blogGetRoute(sequelize));
app.use("/api/v1/blog", blogSetRoute(sequelize));
app.use("/api/v1/blog", blogDelRoute(sequelize));

// 启动服务器
app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}/api/v1/blog`);
    console.log(`Server will running at http://127.0.0.1:${port}/api/v1/blog/get`);
    console.log(`Server will running at http://127.0.0.1:${port}/api/v1/blog/set`);
    console.log(`Server will running at http://127.0.0.1:${port}/api/v1/blog/del`);
});
