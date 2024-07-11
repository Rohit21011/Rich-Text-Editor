/* eslint-disable react/prop-types */

import { useState } from "react";
import Button from "./Button";
import Modal from "./Modal";
import TextEditor from "./TextEditor";

const ContentList = ({ contents, onEdit, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContent, setCurrentContent] = useState("");
  const [currentContentId, setCurrentContentId] = useState(null);

  const openModal = (content, contentId) => {
    setIsModalOpen(true);
    setCurrentContent(content);
    setCurrentContentId(contentId);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentContent("");
    setCurrentContentId(null);
  };

  const handleSave = (newContent) => {
    onEdit(currentContentId, newContent);
    closeModal();
  };
  return (
    <div className="mt-4">
      {contents?.map((contentItem, index) => (
        <div key={index} className="p-4 mb-4 bg-gray-100 shadow-md rounded-lg flex items-center justify-between">
          <div dangerouslySetInnerHTML={{ __html: contentItem.content }} className="prose" />
          <div className="flex justify-end mt-2">
            <Button onClick={() => openModal(contentItem.content, contentItem._id)} className="bg-green-500 text-white hover:bg-green-700 mr-2">
              Edit
            </Button>
            <Button onClick={() => onDelete(contentItem._id)} className="bg-red-500 text-white hover:bg-red-700">
              Delete
            </Button>
          </div>
          
        </div>
      ))}

      {/* Main modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <TextEditor initialValue={currentContent} onSave={handleSave} />
      </Modal>
    </div>
  );
};

export default ContentList;
