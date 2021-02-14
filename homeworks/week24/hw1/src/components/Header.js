import styled from "styled-components";
import { MEDIA_QUERY_MD } from "../constants/style";
import { Link, useLocation, useHistory } from "react-router-dom";
import { setLoginOut } from "../redux/reducers/userReducer";
import { useSelector, useDispatch } from "react-redux";

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eeeeee;
  padding: 20px;

  ${MEDIA_QUERY_MD} {
    flex-direction: column;
    align-items: center;
  }
`;

const BlogLogo = styled.div`
  margin: 0 30px;
  color: #222222;
  font-size: 28px;
  font-weight: bold;
  font-family: "Archivo Black", sans-serif;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const NavItem = styled(Link)`
  color: #d1d1d1;
  text-decoration: none;
  padding: 10px;

  &:hover {
    color: #222222;
    filter: brightness(1.05);
  }

  ${(props) => props.$active && "color: #222222;"};
`;

const BtnLogin = styled(Link)`
  margin: 0 10px;
  border-radius: 4px;
  padding: 8px 15px;
  background: #212121;
  color: white;
  transition: all 0.3s ease-in;
  text-decoration: none;

  &:hover {
    background: #414141;
  }
`;
const BtnLogout = styled.button`
  background: #212121;
  color: white;
  padding: 8px 15px;
  border-radius: 4px;
  transition: all 0.2s ease-in;
  cursor: pointer;

  &:hover {
    background: #414141;
  }
`;

const BtnPost = styled(BtnLogin)`
  box-sizing: border-box;
  background: white;
  border: 1px solid #212121;
  color: #212121;

  &:hover {
    background: #eeeeee;
    border-color: white;
  }
`;

export default function Header() {
  let location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const isLogin = useSelector((store) => store.user.isLogin);
  const isPosting = location.pathname.indexOf("/post") === 0 ? true : false;
  const handleLogout = () => {
    dispatch(setLoginOut());
    history.push("/");
  };

  return (
    <Nav>
      <Wrapper>
        <BlogLogo>LIDEMY</BlogLogo>
        <NavItem to="/" $active={location.pathname === "/"}>
          Home
        </NavItem>
        <NavItem to="/archive" $active={location.pathname === "/archive"}>
          Archive
        </NavItem>
        <NavItem to="/about" $active={location.pathname === "/about"}>
          About
        </NavItem>
      </Wrapper>
      <div>
        {!isLogin && <BtnLogin to="/register">Sign up</BtnLogin>}
        {!isLogin && <BtnLogin to="/login">Log in</BtnLogin>}
        {isLogin && !isPosting && (
          <BtnLogout onClick={handleLogout}>Sign out</BtnLogout>
        )}
        {isLogin && !isPosting && <BtnPost to="/post">New Post</BtnPost>}
      </div>
    </Nav>
  );
}
