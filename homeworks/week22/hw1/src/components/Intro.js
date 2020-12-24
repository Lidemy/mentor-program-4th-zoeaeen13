import styled from "styled-components";
import { MEDIA_QUERY_LG } from "../constants/style";

const IntroWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  top: 50%;
  margin: 0 8%;

  ${MEDIA_QUERY_LG} {
    display: none;
  }
`;

const IntroBadge = styled.h5`
  margin: 10px 0;
  font-family: "Montserrat", sans-serif;
  color: #d1d1d1;
`;
const AuthorName = styled.div`
  color: #222222;
  font-size: 18px;
  font-weight: bold;
  font-family: "Archivo Black", sans-serif;
`;

const AuthorDesc = styled.p`
  width: 150px;
  color: #525252;
  font-size: 14px;
  overflow-wrap: break-word;

  a {
    color: #525252;
    text-decoration: underline;
  }
`;

const AvatarWrapper = styled.div`
  width: 150px;
  margin: 0 auto;

  img {
    width: 50%;
    object-fit: cover;
  }
`;

export default function Intro() {
  return (
    <IntroWrapper>
      <AvatarWrapper>
        <img src="images/avatar.png" alt="" />
      </AvatarWrapper>
      <IntroBadge>ABOUT</IntroBadge>
      <AuthorName>Lidemy</AuthorName>
      <AuthorDesc>
        一個為初學者而生的線上程式課程平台
        <a href="https://lidemy.com/">https://lidemy.com/</a>
      </AuthorDesc>
    </IntroWrapper>
  );
}
