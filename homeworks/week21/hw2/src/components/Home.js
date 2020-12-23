import styled from "styled-components";
import PropTypes from "prop-types";
import leftArrow from "../images/left-arrow.svg";
import rightArrow from "../images/right-arrow.svg";
import { Link } from "react-router-dom";
import { MEDIA_QUERY_LG } from "../constants/style";
export const AppWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  aligh-items: center;
  position: relative;
  margin: 10vh auto;
  border-top: 0.5rem solid #2e2e2e;
  padding: 10px;
  width: 85vw;

  ${MEDIA_QUERY_LG} {
    flex-direction: column-reverse;
    align-items: flex-start;
  }

  &:before {
    content: "DESIGNED BY MENG-HUA";
    font-weight: bold;
    color: #2e2e2e;
    font-size: 16px;
    position: absolute;
    top: -30px;
  }
`;
export const Container = styled.div`
  padding: 10px;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  ${MEDIA_QUERY_LG} {
    width: 100%;
    justify-content: flex-start;
  }
`;
const GameIntroWrappre = styled.div`
  padding: 10px;
  width: 50%;
  color: #2e2e2e;

  ${MEDIA_QUERY_LG} {
    width: 90%;
  }

  h1 {
    margin: 10px 0;
    font-size: 56px;
    font-weight: bold;
  }

  h2 {
    font-size: 35px;
    font-weight: bold;
  }

  p {
    padding: 10px 0;
    font-size: 18px;
    letter-spacing: 0.1em;
  }
`;

export const ArrowWrapper = styled(Link)`
  margin: 30px;
  width: 50px;
  height: 50px;
  transition: 0.2s all ease-in;
  cursor: pointer;
  background-image: url("${(props) =>
    props.direction === "right" ? rightArrow : leftArrow}");
  background-size: cover;
  &:hover {
    transform: scale(1.2);
  }
`;

export function GameIntro({ num, name, desc }) {
  return (
    <GameIntroWrappre>
      <h1>{"NO. " + num}</h1>
      <h2>{name}</h2>
      <p>{desc}</p>
    </GameIntroWrappre>
  );
}

GameIntro.propTypes = {
  num: PropTypes.number,
  name: PropTypes.string,
  desc: PropTypes.string,
};
