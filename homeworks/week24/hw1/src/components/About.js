import styled from "styled-components";

export const AboutWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10vh auto;
  padding: 20px;
  width: 60%;
`;

export const AboutBadge = styled.h5`
  margin: 10px 0;
  font-family: "Montserrat", sans-serif;
  color: #d1d1d1;
`;

export const AboutTitle = styled.div`
  color: #222222;
  font-size: 30px;
  font-weight: bold;
  font-family: "Archivo Black", sans-serif;
`;

export const AboutDesc = styled.p`
  color: #525252;
  font-size: 16px;
  overflow-wrap: break-word;

  a {
    color: #525252;
    text-decoration: underline;
  }
  span {
    color: #ca4141;
  }
`;

export const AboutAvatarWrapper = styled.div`
  width: 150px;
  margin: 30px;

  img {
    width: 100%;
    object-fit: cover;
  }
`;
