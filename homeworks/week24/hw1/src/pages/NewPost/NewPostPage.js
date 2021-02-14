import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  createNewPost,
  getRecentPost,
  clearPostPage,
  setPostEdited,
} from "../../redux/reducers/postsReducer";
import { useSelector, useDispatch } from "react-redux";
import ERRMESSAGE from "../../constants/errorMessage";
import {
  NewPostForm,
  NewPostWrapper,
  InputPostTitle,
  InputPostContent,
  ErrorMessage,
  BtnPublish,
} from "../../components/NewPost";

function NewPostPage() {
  let { slug } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const recentPost = useSelector((store) => store.posts.recentPost);

  // UI state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  // init
  useEffect(() => {
    if (slug) {
      dispatch(getRecentPost(slug));
    }

    return () => {
      dispatch(clearPostPage());
    };
  }, [slug, dispatch]);

  // default value
  useEffect(() => {
    if (recentPost && slug) {
      setTitle(recentPost.title);
      setContent(recentPost.body);
    }
  }, [slug, recentPost]);

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
      return setErrorMessage(ERRMESSAGE.BLANK_ARTICLE);
    }
    if (slug) {
      dispatch(setPostEdited(slug, title, content)).then((res) => {
        if (!res.id) {
          return setErrorMessage(res.message);
        }
        history.push("/");
      });
    } else {
      dispatch(createNewPost(title, content)).then((res) => {
        if (!res.id) {
          return setErrorMessage(res.message);
        }
        history.push("/");
      });
    }
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
