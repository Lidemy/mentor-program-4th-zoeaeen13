import styled from "styled-components";
import { Link } from "react-router-dom";

export const LoginPageRoot = styled.div`
  text-align: center;
`;

export const LoginTitle = styled.h2`
  font-size: 32px;
  font-weight: bold;
  color: #222222;
`;

export const LoginDesc = styled.p`
  font-size: 20px;
  color: #222222;
`;

export const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const LoginInputHint = styled.h6`
  margin: 10px 0;
  font-size: 14px;
  font-weight: 300;
  color: ${(props) => (props.verify ? "#ca3e47" : "#222222")};
`;

export const LoginInput = styled.input`
  margin-bottom: 20px;
  border: none;
  border-bottom: 1px solid ${(props) => (props.verify ? "#ca3e47" : "#222222")};
  padding: 10px;
  width: 20%;

  &:focus {
    outline: none;
  }
`;
export const ErrorMessage = styled.h5`
  font-size: 16px;
  color: #ca3e47;
`;

export const BtnLogin = styled.button`
  border: none;
  background: #212121;
  text-decoration: none;
  margin: 20px 0;
  padding: 8px 15px;
  border-radius: 4px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  color: white;

  &:hover {
    transform: scale(1.05);
  }
`;
export const BtnBackToHome = styled(Link)`
  color: #1a8917;
  font-size: 14px;
  font-family: "Montserrat", sans-serif;
  text-decoration: none;
`;
