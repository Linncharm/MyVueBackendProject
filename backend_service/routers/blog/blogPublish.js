import express from "express";
import { Octokit } from "octokit";
import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

// 初始化 Supabase 客户端
const supabase = createClient(
    process.env.SUPABASE_URL, // 你的 Supabase URL
    process.env.SUPABASE_KEY  // 你的 Supabase 密钥
);

export default () => {
    const router = express.Router();

    router.post("/publish", async (req, res) => {
        try {
            console.log("Publishing blog...");
            router.use(express.json());
            const { id, action } = req.body;
            const formattedAction = Number(action);
            console.log("body:", req.body);

            // 更新数据库中的 publishState 和 publishAction
            const { error: updateError } = await supabase
                .from("blog_information")
                .update({
                    publishState: formattedAction,
                    publishAction: formattedAction,
                })
                .eq("id", id); // 条件：匹配 id

            if (updateError) {
                console.error("Error updating publish state:", updateError);
                return res.status(500).json({ message: "Error updating publish state" });
            }

            console.log("Blog published successfully!");

            // 获取博客内容
            const { data, error: fetchError } = await supabase
                .from("blog_information")
                .select("blogContent, title, category, description")
                .eq("id", id)
                .single(); // 获取单个结果

            if (fetchError) {
                console.error("Error fetching blog content:", fetchError);
                return res.status(500).json({ message: "Error fetching blog content" });
            }

            const { blogContent, title, category, description } = data;
            const filePath = `../../../content/${category}/${title}.md`;

            // 保存博客内容到本地
            const dirPath = path.dirname(filePath);
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true }); // 递归创建目录
            }
            fs.writeFile(filePath, blogContent, (err) => {
                if (err) {
                    console.error("Error saving file:", err);
                    return res.status(500).json({ code: 500, message: "Error saving file" });
                } else {
                    console.log(`File created: ${filePath}`);
                    res.status(200).json({ code: 200, message: "Blog published and saved to local successfully" });
                }
            });

            // 上传到 GitHub
            const base64Content = Buffer.from(blogContent).toString("base64");
            await updateFile(base64Content, description);

        } catch (error) {
            console.error("Error publishing blog:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });

    // 上传到 GitHub 的功能
    async function updateFile(content, description) {
        const octokit = new Octokit({
            auth: process.env.GITHUB_TOKEN, // 使用 GitHub 密钥
        });

        try {
            const response = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
                owner: 'Linncharm',
                repo: 'Linncharm.github.io',
                path: 'docs/test1.md',
                message: description,
                committer: {
                    name: 'Linncharm',
                    email: 'linncharm9@gmail.com',
                },
                content: content,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28',
                },
            });
            console.log("GitHub publish response:", response);
        } catch (error) {
            console.error("Error publishing blog to GitHub:", error);
        } finally {
            console.log("Blog published to GitHub successfully!");
        }
    }

    return router;
};
