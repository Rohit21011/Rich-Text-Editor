const Content = require("../model/content");

const updateContent = async (req, res) => {
  const {contentId,content } = req.body;
 

  try {
    const existingContent = await Content.findOneAndUpdate(
      { _id:contentId },
      { content },
      { new: true }
    );

    if (!existingContent) {
      return res.status(404).json({ error: "Content not found or unauthorized" });
    }

    res.status(200).json({ data: existingContent });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
module.exports = {updateContent}