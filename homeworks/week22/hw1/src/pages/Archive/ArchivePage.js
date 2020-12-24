import { useEffect, useState } from "react";
import { getUserPosts, getArchivePosts } from "../../WebAPI";
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
  const [userPosts, setUserPosts] = useState([]);
  const [author, setAuthor] = useState(null);
  const [archivePosts, setArchivePosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  // const [recentPosts, setRecentPosts] = useState([]);
  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  // init
  useEffect(() => {
    // specific user posts
    if (slug) {
      getUserPosts(slug).then((response) => {
        if (response.posts.length > 0) {
          setUserPosts(response.posts.reverse());
        }
        setAuthor({
          nickname: response.nickname,
          postNum: response.posts.length,
        });
      });
    } else {
      // archive
      getArchivePosts(1)
        .then((res) => {
          if (res.headers.get("X-Total-Count")) {
            const total = Number(res.headers.get("X-Total-Count"));
            let quotient = Math.ceil(total / 5);
            if (!total % 5) {
              quotient += 1;
            }
            console.log("totalPage", quotient);
            setTotalPage(quotient);
            return res.json();
          }
        })
        .then((posts) => {
          console.log("posts", posts);
          setArchivePosts(posts);
        });
    }
  }, [slug]);

  // change pages
  useEffect(() => {
    return getArchivePosts(currentPage)
      .then((res) => res.json())
      .then((posts) => {
        setArchivePosts(posts);
      });
  }, [currentPage]);

  return (
    <HomePageRoot>
      <Intro />
      <HomeWrapper>
        {!slug && <ArchiveTitle>所有文章</ArchiveTitle>}
        {slug && author && (
          <ArchiveTitle>
            '{author.nickname}' 目前發表了 {author.postNum} 篇文章
          </ArchiveTitle>
        )}
        {archivePosts &&
          archivePosts.map((post) => <ArchiveItem key={post.id} post={post} />)}
        {slug &&
          userPosts.map((post) => <ArchiveItem key={post.id} post={post} />)}
        {!slug && archivePosts && totalPage && (
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
