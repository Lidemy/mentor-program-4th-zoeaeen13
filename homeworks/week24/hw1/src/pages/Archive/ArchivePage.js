import { useEffect, useState } from "react";
import { getPosts, getUserPostsById } from "../../redux/reducers/postsReducer";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Intro from "../../components/Intro";
import Pagination from "../../components/Pagination";
import {
  HomePageRoot,
  HomeWrapper,
  ArchiveItem,
  ArchiveTitle,
} from "../../components/Home";

function ArchivePage() {
  let { slug } = useParams();
  const dispatch = useDispatch();
  const archivePosts = useSelector((store) => store.posts.allPosts);
  const userPosts = useSelector((store) => {
    if (store.posts.userPostsData) {
      return store.posts.userPostsData.posts;
    }
  });
  const userData = useSelector((store) => {
    if (store.posts.userPostsData) {
      return store.posts.userPostsData.author;
    }
  });

  // ui state
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [recentPosts, setRecentPosts] = useState([]);

  // init
  useEffect(() => {
    if (slug) {
      dispatch(getUserPostsById(slug));
    } else {
      dispatch(getPosts());
    }
  }, [slug, dispatch]);

  // set archive pagination
  useEffect(() => {
    if (archivePosts) {
      if (archivePosts.length > 0) {
        let quotient = Math.ceil(archivePosts.length / 5);
        if (!archivePosts.length % 5) {
          quotient += 1;
        }
        setCurrentPage(1);
        setTotalPage(quotient);
      }
    }
  }, [archivePosts]);

  // change pages
  useEffect(() => {
    if (archivePosts) {
      const index = (currentPage - 1) * 5;
      setRecentPosts(archivePosts.slice(index, index + 5));
    }
  }, [archivePosts, currentPage]);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <HomePageRoot>
      <Intro />
      <HomeWrapper>
        {!slug && <ArchiveTitle>所有文章</ArchiveTitle>}
        {slug && userData && (
          <ArchiveTitle>
            '{userData.nickname}' 目前發表了 {userData.postsNum} 篇文章
          </ArchiveTitle>
        )}
        {!slug &&
          recentPosts &&
          recentPosts.map((post) => <ArchiveItem key={post.id} post={post} />)}
        {slug &&
          userPosts &&
          userPosts.map((post) => <ArchiveItem key={post.id} post={post} />)}
        {!slug && recentPosts && totalPage && (
          <Pagination
            current={currentPage}
            total={totalPage}
            handleChangePage={handleChangePage}
          />
        )}
      </HomeWrapper>
    </HomePageRoot>
  );
}

export default ArchivePage;
