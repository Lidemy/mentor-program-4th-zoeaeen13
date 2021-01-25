import styled from "styled-components";
import { MEDIA_QUERY_LG } from "../constants/style";

export const Wrapper = styled.div`
  margin: 10vh auto;
  width: 90vw;
  ${MEDIA_QUERY_LG} {
    width: 60vw;
  }
`;

export const TodosWrapper = styled.section`
  background: white;
  box-shadow: 4px 4px 25px #f0f0f0;
`;
