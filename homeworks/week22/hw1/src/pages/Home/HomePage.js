import { useEffect, useState } from "react";
import { getAllPosts } from "../../WebAPI";
import Intro from "../../components/Intro";
import { HomePageRoot, HomeWrapper, Post } from "../../components/Home";

function HomePage() {
  const [posts, setPosts] = useState([]);

  // init
  useEffect(() => {
    getAllPosts().then((posts) => setPosts(posts));
  }, []);

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
