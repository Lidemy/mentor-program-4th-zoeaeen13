import {
  AboutWrapper,
  AboutAvatarWrapper,
  AboutBadge,
  AboutTitle,
  AboutDesc,
} from "../../components/About";
import imgAvatar from "../../images/avatar.png";

function AboutPage() {
  return (
    <AboutWrapper>
      <AboutAvatarWrapper>
        <img src={imgAvatar} alt="" />
      </AboutAvatarWrapper>
      <div>
        <AboutBadge>ABOUT</AboutBadge>
        <AboutTitle>第四期程式導師計畫</AboutTitle>
        <AboutDesc>
          不喊口號也不誇大成效，開放透明的 <span>網頁前後端線上學習計畫</span>
          <br />
          試著用六個月的時間，培養出一個找得到工作且基礎紮實的網頁工程師
          <br />
          <a href="https://bootcamp.lidemy.com/index.html">
            https://bootcamp.lidemy.com
          </a>
        </AboutDesc>
      </div>
    </AboutWrapper>
  );
}

export default AboutPage;
