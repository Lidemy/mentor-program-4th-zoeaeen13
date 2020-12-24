import styled from "styled-components";
import { MEDIA_QUERY_LG } from "../constants/style";

export const NewPostForm = styled.form`
  position: relative;
`;

export const NewPostWrapper = styled.div`
  text-align: center;
  margin: 6vh auto;
  border: none;
  overflow: hidden;
  border-radius: 2px;
  box-sizing: border-box;
  width: 60%;

  ${MEDIA_QUERY_LG} {
    width: 90%;
  }
`;

export const InputPostTitle = styled.input`
  font-weight: bold;
  font-size: 30px;
  letter-spacing: 1px;
  margin: 20px auto;
  box-sizing: border-box;
  border: none;
  padding: 5px;
  color: #292929;
  width: 80%;

  &:focus {
    outline: none;
  }
`;
export const InputPostContent = styled.textarea`
  margin: 20px auto;
  color: #292929;
  width: 80%;
  border: 1px solid #d1d1d1;
  border-radius: 5px;
  font-size: 18px;
  letter-spacing: 1px;
  padding: 20px;

  &:focus {
    outline: none;
  }
`;

export const ErrorMessage = styled.h5`
  font-size: 16px;
  color: #ca3e47;
`;

export const BtnPublish = styled.button`
  position: absolute;
  top: 0;
  right: 50px;
  margin: 20px 10px;
  border: none;
  border-radius: 4px;
  padding: 8px 14px;
  font-size: 13px;
  font-weight: bold;
  background: #03a87c;
  color: white;
  cursor: pointer;
  text-decoration: none;

  &:focus {
    outline: none;
  }

  &:hover {
    filter: brightness(1.1);
  }
`;
