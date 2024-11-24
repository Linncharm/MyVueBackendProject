const express = require("express");

module.exports = (sequelize) => {
    const router = express.Router();

    router.delete("/del", async (req, res) => {
        try {

            console.log("Deleting blog...");

            router.use(express.json());

            // 从请求体中提取参数
            const { id } = req.body;

            // 使用 raw SQL 删除数据
            const deleteQuery = `
                DELETE FROM blog.blog_information WHERE id = :id
            `;

            // 执行删除操作
            const [result] = await sequelize.query(deleteQuery, {
                replacements: { id },
            });

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Blog not found" });
            }

            console.log(`Blog with ID ${id} deleted successfully`);
            res.status(200).json({ message: `Blog with ID ${id} deleted successfully` });
        } catch (error) {
            console.error("Error deleting blog:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });

    return router;
}