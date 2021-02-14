import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  getRecentPost,
  getRelatedPosts,
  setPostDeleted,
  clearPostPage,
} from "../../redux/reducers/postsReducer";
import { useSelector, useDispatch } from "react-redux";
import Intro from "../../components/Intro";
import {
  HomePageRoot,
  HomeWrapper,
  PostInfo,
  RelatedPost,
  RelatedWrapper,
  RelatedTitle,
} from "../../components/Home";

function PostPage() {
  let { slug } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const recentPost = useSelector((store) => store.posts.recentPost);
  const relatedPosts = useSelector((store) => store.posts.relatedPosts);
  const userData = useSelector((store) => {
    if (store.user.userInfo) return store.user.userInfo;
  });
  const [isUser, setIsUser] = useState(false);

  // init
  useEffect(() => {
    dispatch(getRecentPost(slug));
    return () => {
      dispatch(clearPostPage());
    };
  }, [slug, history, dispatch]);

  useEffect(() => {
    if (recentPost) {
      dispatch(getRelatedPosts(recentPost.user.id, Number(slug)));
    }
  }, [slug, recentPost, dispatch]);

  useEffect(() => {
    if (userData && recentPost) {
      setIsUser(userData.username === recentPost.user.username);
    }
  }, [userData, recentPost]);

  const handleDeletePost = (id) => {
    dispatch(setPostDeleted(id)).then((statusCode) => {
      if (statusCode === 200) {
        history.push("/");
      }
    });
  };

  return (
    <HomePageRoot>
      <Intro />
      <HomeWrapper>
        {recentPost && (
          <PostInfo
            isUser={isUser}
            post={recentPost}
            handleDeletePost={handleDeletePost}
          />
        )}
        <RelatedTitle>同系列文章還有...</RelatedTitle>
        <RelatedWrapper>
          {relatedPosts &&
            relatedPosts.map((post, index) => (
              <RelatedPost key={post.id} order={index + 1} post={post} />
            ))}
          {!relatedPosts && <div>no related posts</div>}
        </RelatedWrapper>
      </HomeWrapper>
    </HomePageRoot>
  );
}

export default PostPage;
