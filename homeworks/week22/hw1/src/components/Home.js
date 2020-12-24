import styled from "styled-components";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { timeConverter } from "../utills";
import { MEDIA_QUERY_MD, MEDIA_QUERY_LG } from "../constants/style";

const PostWrapper = styled.div`
  border-bottom: 1px solid #eeeeee;
  margin-bottom: 20px;
  padding: 25px 0;
`;
const PostTitle = styled(Link)`
  margin: 5px 0;
  color: #212121;
  font-size: 32px;
  font-weight: bold;
  font-family: "微軟正黑體";
  letter-spacing: 0.1em;
  text-decoration: none;
`;

const RelatedPostTitle = styled(Link)`
  margin: 5px 0;
  color: #212121;
  font-size: 20px;
  font-weight: bold;
  font-family: "微軟正黑體";
  letter-spacing: 0.1em;
  text-decoration: none;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PostContent = styled.p`
  color: #212121;
  font-size: 22px;
  font-family: "微軟正黑體";
  letter-spacing: 0.05em;
  line-height: 1.5;
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const PostInfoTitle = styled.h2`
  margin: 10px 0;
  color: #212121;
  font-size: 32px;
  font-weight: bold;
  font-family: "微軟正黑體";
  letter-spacing: 0.1em;
`;

const PostAuthor = styled(Link)`
  margin: 10px 0;
  border: 1px solid #212121;
  border-radius: 4px;
  padding: 2px 5px;
  color: #212121;
  font-size: 14px;
  font-family: "微軟正黑體";
  text-decoration: none;
`;

const PostBody = styled.p`
  color: #212121;
  font-size: 22px;
  font-family: "微軟正黑體";
  letter-spacing: 0.05em;
  line-height: 1.5;
  text-overflow: ellipsis;
  word-wrap: break-word;
`;

const PostDate = styled.h5`
  margin: 5px 0;
  color: #d1d1d1;
  font-size: 16px;
  font-family: "Montserrat", sans-serif;
`;

const BtnReadMore = styled(Link)`
  color: #1a8917;
  font-size: 14px;
  font-family: "Montserrat", sans-serif;
  text-decoration: none;
`;

const RelatedPostWrapper = styled.div`
  border: 1px solid #d1d1d1;
  background: #fcfcfc;
  border-radius: 10px;
  padding: 20px;
  width: 25%;
  transition: all 0.3s ease-in;

  &:hover {
    transform: scale(1.04);
  }

  & + & {
    margin-left: 20px;
  }

  ${MEDIA_QUERY_MD} {
    width: 80%;
    margin-bottom: 20px;

    & + & {
      margin-left: 0px;
    }
  }
`;

const RelatedPostNum = styled.span`
  font-size: 16px;
  color: #212121;
  letter-spacing: 0.1em;
`;
const ArchiveContent = styled.p`
  color: #212121;
  font-size: 22px;
  font-family: "微軟正黑體";
  letter-spacing: 0.05em;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const AppWrapper = styled.div`
  padding-top: 15vh;
`;

export const RelatedTitle = styled.h4`
  margin: 10px 0;
  border-radius: 4px;
  padding: 2px 5px;
  color: #212121;
  font-size: 20px;
  font-family: "微軟正黑體";
`;

export const ArchiveTitle = styled.h3`
  margin: 20px 0;
  padding: 10px 0;
  color: #818181;
  font-size: 28px;
  text-decoration: underline;
  font-family: "微軟正黑體";
`;
export const HomePageRoot = styled.div``;

export const HomeWrapper = styled.div`
  margin: 0 auto;
  width: 50%;

  ${MEDIA_QUERY_LG} {
    width: 80%;
  }
`;

export const RelatedWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-bottom: 10vh;

  ${MEDIA_QUERY_MD} {
    flex-direction: column;
    align-items: center;
  }
`;

export function Post({ post }) {
  const date = timeConverter(post.createdAt);
  return (
    <PostWrapper>
      <PostDate>{date}</PostDate>
      <PostTitle to={`/posts/${post.id}`}>{post.title}</PostTitle>
      <PostContent>{post.body}</PostContent>
      <BtnReadMore to={`/posts/${post.id}`}>Read more</BtnReadMore>
    </PostWrapper>
  );
}

export function PostInfo({ post }) {
  const date = timeConverter(post.createdAt);
  return (
    <PostWrapper>
      <PostDate>{date}</PostDate>
      <PostInfoTitle>{post.title}</PostInfoTitle>
      {post.user.nickname && (
        <PostAuthor to={`/user/${post.userId}`}>
          {post.user.nickname}
        </PostAuthor>
      )}
      <PostBody>{post.body}</PostBody>
    </PostWrapper>
  );
}

export function RelatedPost({ order, post }) {
  const date = timeConverter(post.createdAt);
  return (
    <RelatedPostWrapper>
      <RelatedPostNum>#{order}</RelatedPostNum>
      <RelatedPostTitle to={`/posts/${post.id}`}>{post.title}</RelatedPostTitle>
      <PostDate>{date}</PostDate>
    </RelatedPostWrapper>
  );
}

export function ArchiveItem({ post }) {
  const date = timeConverter(post.createdAt);
  return (
    <PostWrapper>
      <PostTitle to={`/posts/${post.id}`}>{post.title}</PostTitle>
      <PostDate>{date}</PostDate>
      <ArchiveContent>{post.body}</ArchiveContent>
    </PostWrapper>
  );
}

Post.propTypes = {
  post: PropTypes.object,
};

PostInfo.propTypes = {
  post: PropTypes.object,
};

RelatedPost.propTypes = {
  order: PropTypes.number,
  post: PropTypes.object,
};

ArchiveItem.propTypes = {
  post: PropTypes.object,
};
