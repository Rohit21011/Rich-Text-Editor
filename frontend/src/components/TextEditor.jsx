
import { useAuth0 } from "@auth0/auth0-react";

import { useState } from "react";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Button from "./Button";

// eslint-disable-next-line react/prop-types
const TextEditor = ({ initialValue, onSave }) => {
  const { isAuthenticated, isLoading} = useAuth0();
  const [content, setContent] = useState(initialValue || '');

  const handleChange = (value) => {
    setContent(value);
  };

  const handleSave = () => {
    onSave(content);
  };
 
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <>
      
    <div className="p-4 bg-white shadow-md rounded-lg">
        {/* <Button className="bg-red-500 text-white hover:bg-red-700" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Log out</Button> */}
      <ReactQuill value={content} onChange={handleChange} className="mb-4" />
      <Button onClick={handleSave} className="bg-blue-500 text-white hover:bg-blue-700">
          Save
      </Button>
    </div>
      </>
    
    )
  );
};

export default TextEditor;