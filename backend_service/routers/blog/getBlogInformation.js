const express = require("express");

module.exports = (sequelize) => {
    const router = express.Router();

    router.get("/get", async (req, res) => {
        try {
            console.log("Fetching blogs...");
            // 使用 raw SQL 查询博客数据
            const [blogs] = await sequelize.query("SELECT * FROM blog.blog_information");
            console.log(blogs)
            res.status(200).json(blogs);
        } catch (error) {
            console.error("Error fetching blogs:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });

    return router;
};
