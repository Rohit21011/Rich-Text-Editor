const Content = require("../model/content");

const createContent = async (req, res) => {
  const { content,userId } = req.body;
  try {
    const newContent = new Content({
      userId,
      content
    });

    await newContent.save();
    res.status(201).json({ data: newContent });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = { createContent };
