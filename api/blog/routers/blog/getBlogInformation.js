import express from "express";
import { createClient } from '@supabase/supabase-js';

// 初始化 Supabase 客户端
const supabase = createClient(
    process.env.SUPABASE_URL, // 你的 Supabase URL
    process.env.SUPABASE_KEY  // 你的 Supabase 密钥
);

export default () => {
    const router = express.Router();

    // 获取博客列表接口
    router.get("/get", async (req, res) => {
        try {
            console.log("Fetching blogs...");

            // 使用 Supabase 查询博客数据
            const { data: blogs, error } = await supabase
                .from('blog_information')  // 表名
                .select('*');  // 获取所有字段

            if (error) {
                throw error;
            }

            console.log(blogs);
            res.status(200).json(blogs);
        } catch (error) {
            console.error("Error fetching blogs:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });

    return router;
};
