import styled from "styled-components";
import imgLeft from "../images/left-arrow.png";
import imgRight from "../images/right-arrow.png";
import PropTypes from "prop-types";

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  width: 80%;
  backgroudn: red;
`;

const CurrentPage = styled.h5`
  color: #212121;
  font-size: 18px;
  font-weight: bold;
  font-family: "微軟正黑體";
  letter-spacing: 0.1em;
  color: #818181;
`;

const ArrowWrapper = styled.button`
  width: 40px;
  border: none;
  background: transparent;
  transition: 0.2s all ease-in;
  cursor: pointer;
  margin: 0 10px;

  img {
    width: 100%;
    object-fit: cover;
  }

  &:focus {
    outline: none;
  }

  &:hover {
    transform: scale(1.3);
  }
`;

export default function Pagination({ current, total, handleChangePage }) {
  const handleNextPage = () => {
    handleChangePage(current + 1);
  };

  const handlePreviouspage = () => {
    handleChangePage(current - 1);
  };

  return (
    <PaginationWrapper>
      {current !== 1 && (
        <ArrowWrapper onClick={handlePreviouspage}>
          <img alt="" src={imgLeft} />
        </ArrowWrapper>
      )}
      <CurrentPage>目前第 {current} 頁</CurrentPage>
      {current !== total && (
        <ArrowWrapper onClick={handleNextPage}>
          <img alt="" src={imgRight} />
        </ArrowWrapper>
      )}
    </PaginationWrapper>
  );
}

Pagination.propTypes = {
  current: PropTypes.number,
  total: PropTypes.number,
  handleChangePage: PropTypes.func,
};
