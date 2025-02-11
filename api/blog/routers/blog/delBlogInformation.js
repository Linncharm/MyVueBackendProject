import express from "express";
import { createClient } from '@supabase/supabase-js';

// 初始化 Supabase 客户端
const supabase = createClient(
    process.env.SUPABASE_URL, // 你的 Supabase URL
    process.env.SUPABASE_KEY  // 你的 Supabase 密钥
);

export default () => {
    const router = express.Router();

    // 删除博客接口
    router.delete("/del", async (req, res) => {
        try {
            console.log("Deleting blog...");

            router.use(express.json());

            // 从请求体中提取参数
            const { id } = req.body;

            // 使用 Supabase 删除数据
            const { data, error } = await supabase
                .from('blog_information')  // 表名
                .delete()
                .eq('id', id);  // 根据 id 删除对应的博客

            if (error) {
                console.error("Error deleting blog:", error);
                return res.status(500).json({ message: "Internal server error" });
            }

            if (data.length === 0) {
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
};
