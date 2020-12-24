import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPostInfo, getUserPosts } from "../../WebAPI";
import {
  HomePageRoot,
  HomeWrapper,
  PostInfo,
  RelatedPost,
  RelatedWrapper,
  RelatedTitle,
} from "../../components/Home";
import Intro from "../../components/Intro";

function PostPage() {
  let { slug } = useParams();
  const [recentPost, setRecentPost] = useState(null);
  const [userId, setUserId] = useState(0);
  const [relatedPosts, setRelatedPosts] = useState(null);
  console.log("rela", relatedPosts);
  // init
  useEffect(() => {
    getPostInfo(slug).then((postInfo) => {
      setRecentPost(postInfo[0]);
      setUserId(postInfo[0].userId);
    });
  }, [slug]);

  useEffect(() => {
    getUserPosts(userId).then((responseData) => {
      if (responseData.id) {
        const relatedAllPosts = responseData.posts.filter(
          (post) => post.id !== Number(slug)
        );
        if (relatedAllPosts.length > 0) {
          setRelatedPosts(relatedAllPosts.filter((post, index) => index < 3));
        }
      }
    });
  }, [slug, userId]);

  return (
    <HomePageRoot>
      <Intro />
      <HomeWrapper>
        {recentPost && <PostInfo post={recentPost} />}
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
