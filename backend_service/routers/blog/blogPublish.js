const express = require("express");

module.exports = (sequelize) => {
    const router = express.Router();

    router.post("/publish", async (req, res) => {
        try {
            console.log("Publishing blog...");
            router.use(express.json());
            const { id , action } = req.body;
            const formattedAction = Number(action);
            console.log("body:", req.body);
            const updateQuery = `
                UPDATE blog.blog_information
                SET publishState = :formattedAction, publishAction = :formattedAction
                WHERE id = :id;
            `;
            await sequelize.query(updateQuery, {
                replacements: { formattedAction,id },
            });
            console.log("Blog published successfully!");
            res.status(200).json({ code:200,message: "Blog published successfully" });
        } catch (error) {
            console.error("Error publishing blog:", error);
            res.status(500).json({ message: "Internal server error" });
        }finally {
            //通过github restful上传content到main分支，触发github action自动部署
            const { id } = req.body;
            const publishQuery = `
                SELECT blogContent , title ,category FROM blog.blog_information
                WHERE id = :id;
            `;
            const [content] = await sequelize.query(publishQuery, {
                replacements: { id },
            });
            const { blogContent , title ,category } = content[0];
            const fileName = title;
            const fs = require("fs");
            const path = require("path");
            const filePath = path.join(__dirname, `../../../content/${category}/${fileName}.md`);

            // 检查目录是否存在，如果不存在则创建目录
            const dirPath = path.dirname(filePath);
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true }); // 递归创建目录
            }

            fs.writeFile(filePath, blogContent, (err) => {
                if (err) {
                    console.error("文件创建失败:", err);
                } else {
                    console.log(`文件已创建: ${filePath}`);
                }
            });

        }
    });
    return router;
}