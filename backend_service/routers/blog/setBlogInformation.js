const express = require("express");

module.exports = (sequelize) => {
    const router = express.Router();

    router.post("/set", async (req, res) => {
        try {

            console.log("Inserting blog...");

            router.use(express.json());

            //初始化设置放在后端进行
            const publishState = 0;
            const publishAction = 0;
            const createdTime = new Date().toISOString();
            const lastUpdatedTime = createdTime;

            // 从请求体中提取参数
            const {  title, author, description, remark, category, tags,content } = req.body;
            const formattedTags = JSON.stringify(tags);
            console.log("body:", req.body);
            // 使用 raw SQL 插入数据,
            const insertQuery = `
                INSERT INTO blog.blog_information ( title, author, description, remark, category, tags, createdTime, lastUpdatedTime, blogContent, publishState, publishAction)
                VALUES ( :title, :author, :description, :remark, :category, :formattedTags, :createdTime, :lastUpdatedTime , :content, :publishState, :publishAction);
            `;

            // 使用 Sequelize 执行插入语句
            await sequelize.query(insertQuery, {
                replacements: {  title, author, description, remark, category, formattedTags, createdTime, lastUpdatedTime,content, publishState,publishAction},
            });

            console.log("Blog inserted successfully!");

            // 返回成功响应
            res.status(201).json({ message: "Blog inserted successfully" });

        } catch (error) {
            console.error("Error inserting blog:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });

    return router;
};
