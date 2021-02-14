import { getAuthToken } from "./utills";

const BASE_URL = "https://student-json-api.lidemy.me";

export const getAllPosts = () => {
  return fetch(`${BASE_URL}/posts?_sort=createdAt&_order=desc`).then((res) =>
    res.json()
  );
};

export const getPostInfo = (id) => {
  return fetch(`${BASE_URL}/posts?id=${id}&_expand=user`).then((res) =>
    res.json()
  );
};

export const getUserPosts = (userId) => {
  return fetch(`${BASE_URL}/users/${userId}?_embed=posts`).then((res) =>
    res.json()
  );
};

export const login = (username, password) => {
  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  }).then((res) => res.json());
};

export const register = (nickname, username, password) => {
  return fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      nickname: nickname,
      username: username,
      password: password,
    }),
  }).then((res) => res.json());
};

export const getUserInfo = () => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const addNewPost = (title, content) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: title,
      body: content,
    }),
  }).then((res) => res.json());
};

export const deletePost = (id) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/posts/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.status);
};

export const editPostById = (id, newTitle, newContent) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/posts/${id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: newTitle,
      body: newContent,
    }),
  }).then((res) => res.json());
};
