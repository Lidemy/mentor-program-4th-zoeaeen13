import { useState } from "react";
import { useHistory } from "react-router-dom";
import { addNewPost } from "../../WebAPI";
import {
  NewPostForm,
  NewPostWrapper,
  InputPostTitle,
  InputPostContent,
  ErrorMessage,
  BtnPublish,
} from "../../components/NewPost";

function NewPostPage() {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleInputChange = (e) => {
    setErrorMessage(null);
    if (e.target.name === "title") {
      setTitle(e.target.value);
    }

    if (e.target.name === "content") {
      setContent(e.target.value);
    }
  };

  const handleSubmitPost = (e) => {
    e.preventDefault();
    if (!title || !content) {
      return setErrorMessage("Please fill in the blank for your article.");
    }

    // call API
    addNewPost(title, content).then((response) => {
      if (!response.id) {
        return setErrorMessage(response.message);
      }
      history.push("/");
    });
  };

  return (
    <NewPostForm onSubmit={handleSubmitPost}>
      <NewPostWrapper>
        <InputPostTitle
          name="title"
          placeholder="Title"
          value={title}
          onChange={handleInputChange}
        />
        <InputPostContent
          name="content"
          placeholder="Write a story..."
          rows="10"
          cols="50"
          value={content}
          onChange={handleInputChange}
        ></InputPostContent>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </NewPostWrapper>
      <BtnPublish>Publish</BtnPublish>
    </NewPostForm>
  );
}

export default NewPostPage;
