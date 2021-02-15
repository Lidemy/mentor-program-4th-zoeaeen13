import { createSlice } from "@reduxjs/toolkit";
import {
  getAllPosts,
  getPostInfo,
  getUserPosts,
  addNewPost,
  editPostById,
  deletePost,
} from "../../WebAPI";

export const postsReducer = createSlice({
  name: "posts",
  initialState: {
    allPosts: null,
    recentPost: null,
    relatedPosts: null,
    userPostsData: null,
  },

  reducers: {
    setRecentPost: (state, action) => {
      state.recentPost = action.payload;
    },

    setRelatedPosts: (state, action) => {
      state.relatedPosts = action.payload;
    },

    setAllPosts: (state, action) => {
      state.allPosts = action.payload;
    },

    setUserPostData: (state, action) => {
      state.userPostsData = action.payload;
    },
  },
});

export const {
  setRecentPost,
  setRelatedPosts,
  setAllPosts,
  setUserPostData,
} = postsReducer.actions;

export const getPosts = () => (dispatch) => {
  getAllPosts().then((posts) => {
    dispatch(setAllPosts(posts));
  });
};

export const getRecentPost = (id) => (dispatch) => {
  getPostInfo(id).then((postInfo) => {
    dispatch(setRecentPost(postInfo[0]));
  });
};

export const clearPostPage = () => (dispatch) => {
  dispatch(setRecentPost(null));
  dispatch(setRelatedPosts(null));
};

export const getRelatedPosts = (userId, postId) => (dispatch) => {
  getUserPosts(userId).then((res) => {
    if (res.id) {
      const allPosts = res.posts.filter((post) => post.id !== postId);
      if (allPosts.length > 0) {
        dispatch(setRelatedPosts(allPosts.filter((post, index) => index < 3)));
      }
    }
  });
};

export const getUserPostsById = (userId) => (dispatch) => {
  getUserPosts(userId).then((res) => {
    if (res.posts.length > 0) {
      const posts = res.posts.reverse();
      const nickname = res.nickname;
      const postsNum = posts.length;
      dispatch(
        setUserPostData({
          posts: posts,
          author: {
            nickname,
            postsNum,
          },
        })
      );
    }
  });
};

export const createNewPost = (title, content) => (dispatch) => {
  return addNewPost(title, content).then((res) => {
    return res;
  });
};

export const setPostDeleted = (id) => (dispatch) => {
  return deletePost(id).then((statusCode) => {
    return statusCode;
  });
};

export const setPostEdited = (id, newTitle, newContent) => (dispatch) => {
  return editPostById(id, newTitle, newContent).then((res) => {
    return res;
  });
};

export default postsReducer.reducer;
