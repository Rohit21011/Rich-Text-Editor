const Content = require("../model/content");

const getContentForUser = async (req, res) => {
    const {userId} = req.params;
  
    try {
      const content = await Content.find({ userId });
  
      if (!content) {
        return res.status(404).json({ error: "No content found for this user" });
      }
  
      res.status(200).json({ data: content });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };
  module.exports = {getContentForUser}