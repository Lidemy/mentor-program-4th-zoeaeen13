import { useEffect } from "react";
import { getPosts } from "../../redux/reducers/postsReducer";
import { useSelector, useDispatch } from "react-redux";
import Intro from "../../components/Intro";
import { HomePageRoot, HomeWrapper, Post } from "../../components/Home";

function HomePage() {
  const dispatch = useDispatch();
  const posts = useSelector((store) => store.posts.allPosts);

  // init
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <HomePageRoot>
      <Intro />
      <HomeWrapper>
        {posts && posts.map((post) => <Post key={post.id} post={post} />)}
      </HomeWrapper>
    </HomePageRoot>
  );
}

export default HomePage;
