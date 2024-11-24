const express = require("express");

module.exports = (sequelize) => {
    const router = express.Router();

    router.post("/publish", async (req, res) => {
        try {
            console.log("Publishing blog...");
            router.use(express.json());
            const { blogId } = req.body;
            console.log("body:", req.body);
            const updateQuery = `
                UPDATE blog.blog_information
                SET publishState = 1
                WHERE blogId = :blogId;
            `;
            await sequelize.query(updateQuery, {
                replacements: { blogId },
            });
            console.log("Blog published successfully!");
            res.status(200).json({ message: "Blog published successfully" });
        } catch (error) {
            console.error("Error publishing blog:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
}