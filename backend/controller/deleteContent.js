const Content = require("../model/content");

const deleteContent = async (req, res) => {
    const {id} = req.params;
  
    try {
      const deletedContent = await Content.findOneAndDelete({_id:id});
  
      if (!deletedContent) {
        return res.status(404).json({ error: "Content not found or unauthorized" });
      }
  
      res.status(200).json({ message: "Content deleted successfully" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };
  module.exports = {deleteContent}
  