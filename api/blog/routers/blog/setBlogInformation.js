import express from "express";
import { createClient } from '@supabase/supabase-js';

// 初始化 Supabase 客户端
const supabase = createClient(
    process.env.SUPABASE_URL, // 你的 Supabase URL
    process.env.SUPABASE_KEY  // 你的 Supabase 密钥
);

export default () => {
    const router = express.Router();

    // 新增博客接口
    router.post("/set", async (req, res) => {
        try {
            console.log("Inserting blog...");

            // 初始化数据
            const publishState = 0;
            const publishAction = 0;
            const createdTime = new Date().toISOString();
            const lastUpdatedTime = createdTime;

            // 从请求体中提取参数
            const { title, author, description, remark, category, tags, content } = req.body;
            const formattedTags = JSON.stringify(tags);
            console.log("body:", req.body);

            // 使用 Supabase 插入数据
            const { data, error } = await supabase
                .from('blog_information')  // 表名
                .insert([
                    {
                        title,
                        author,
                        description,
                        remark,
                        category,
                        tags: formattedTags,
                        createdTime,
                        lastUpdatedTime,
                        blogContent: content,
                        publishState,
                        publishAction
                    }
                ]);

            if (error) {
                throw error;
            }

            console.log("Blog inserted successfully!");

            // 返回成功响应
            res.status(201).json({ message: "Blog inserted successfully", data });

        } catch (error) {
            console.error("Error inserting blog:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });

    return router;
};
