import { useState } from "react";
import { isNotBlank, isNumber, validateEmail } from "../utills";
import {
  FormBorderDiv,
  FormWrapper,
  Wrapper,
  FormTitle,
  FormDesc,
  FormQuestion,
  ButtonSubmit,
  FormInputItem,
  FormRadioItem,
} from "./FormItems";

function App() {
  const [isClickSubmit, setClickSubmit] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    choices: 1,
    intro: "",
    advice: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setClickSubmit(true);

    if (
      isNotBlank(formData.name) &&
      validateEmail(formData.email) &&
      isNumber(formData.phone) &&
      isNotBlank(formData.intro)
    ) {
      alert("已收到報名資訊，感動您的參與!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        choices: 1,
        intro: "",
        advice: "",
      });
      setClickSubmit(false);
    }
  };

  const handleInputChange = (e) => {
    switch (e.target.name) {
      case "name":
        setFormData({
          ...formData,
          name: e.target.value,
        });
        break;
      case "email":
        setFormData({
          ...formData,
          email: e.target.value,
        });
        break;
      case "phone":
        setFormData({
          ...formData,
          phone: e.target.value,
        });
        break;
      case "choices":
        setFormData({
          ...formData,
          choices: Number(e.target.id),
        });
        break;
      case "intro":
        setFormData({
          ...formData,
          intro: e.target.value,
        });
        break;
      case "advice":
        setFormData({
          ...formData,
          advice: e.target.value,
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className="App">
      <FormWrapper onSubmit={handleSubmit}>
        <FormBorderDiv />
        <Wrapper>
          <FormTitle>新拖延運動報名表單</FormTitle>
          <FormDesc>活動日期：2020/12/10 ~ 2020/12/11</FormDesc>
          <FormDesc>活動地點：台北市大安區新生南路二段1號</FormDesc>
          <FormDesc remind>*必填</FormDesc>
          <FormInputItem
            name="name"
            type="text"
            value={formData.name}
            question="暱稱"
            isRequired={true}
            handleInputChange={handleInputChange}
            setRemind={isClickSubmit && !isNotBlank(formData.name)}
          />
          <FormInputItem
            name="email"
            type="email"
            value={formData.email}
            question="電子郵件"
            isRequired={true}
            handleInputChange={handleInputChange}
            setRemind={isClickSubmit && !validateEmail(formData.email)}
          />
          <FormInputItem
            name="phone"
            type="number"
            value={formData.phone}
            question="手機號碼"
            isRequired={true}
            handleInputChange={handleInputChange}
            setRemind={isClickSubmit && !isNumber(formData.phone)}
          />
          <FormQuestion isRequired={true}>報名類型</FormQuestion>
          <FormRadioItem
            name="choices"
            type={formData.choices}
            handleInputChange={handleInputChange}
          />
          <FormInputItem
            name="intro"
            type="text"
            value={formData.intro}
            question="怎麼知道這個活動的？"
            isRequired={true}
            handleInputChange={handleInputChange}
            setRemind={isClickSubmit && !isNotBlank(formData.intro)}
          />
          <FormInputItem
            name="advice"
            type="text"
            value={formData.advice}
            question="其他對活動的一些建議"
            handleInputChange={handleInputChange}
          />
          <ButtonSubmit>提交</ButtonSubmit>
          <FormDesc remind>*請勿透過表單送出您的密碼</FormDesc>
        </Wrapper>
      </FormWrapper>
    </div>
  );
}

export default App;
