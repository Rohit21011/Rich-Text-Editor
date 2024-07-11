import { useAuth0 } from "@auth0/auth0-react";
import TextEditor from "./components/TextEditor";
import ContentList from "./components/contentList";
import { useState, useEffect } from "react";
import Button from "./components/Button";
import ProfileDropdown from "./components/profileMenu";
import { createContent, deleteContent, getContentForUser, updateContent } from "./apis/api";
// import axios from "axios";

const App = () => {
  const { user,isAuthenticated, loginWithRedirect, getAccessTokenSilently, logout } = useAuth0();
  const [contents, setContents] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
console.log(user)
const fetchContent = async ()=>{
  const result = await getContentForUser();

  setContents(result.data.data);
}
useEffect(()=>{
fetchContent();
},[]);
  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const token = await getAccessTokenSilently();
        localStorage.setItem('accessToken', token); // Store token in localStorage
        localStorage.setItem('userId', user.sub);
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };

    if (isAuthenticated) {
      getAccessToken();
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  const handleSave = async(content) => {
    await createContent(content);
   fetchContent();
  };
console.log(contents)
  const handleEdit = async(currentContentId, newContent) => {
await updateContent(currentContentId,newContent)
    setEditingIndex(newContent);
    fetchContent();
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken'); // Remove token from localStorage
    logout({ returnTo: window.location.origin });
  };
const handleDelete = async(contentId) => {
await deleteContent(contentId);
fetchContent();
}
  return (
    <div className="App">
      {isAuthenticated ? (
        <>
          <div className="container mx-auto p-4">
            <ProfileDropdown onLogout={handleLogout} />
            <h1 className="text-2xl font-bold mb-4">Rich Text Editor</h1>
            <TextEditor
              initialValue={editingIndex !== null ? contents[editingIndex] : ''}
              onSave={handleSave}
            />
            <ContentList contents={contents} onEdit={handleEdit} onDelete={handleDelete} />
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center min-h-screen">
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <h2 className="text-xl font-bold mb-2">Welcome to the Rich Text Editor</h2>
          <p className="mb-4">Create and manage your content with our powerful and easy-to-use rich text editor.</p>
          <Button onClick={() => loginWithRedirect()} className="bg-blue-500 text-white hover:bg-blue-700">
            Log In
          </Button>
        </div>
      </div>
      )}
    </div>
  );
};

export default App;
