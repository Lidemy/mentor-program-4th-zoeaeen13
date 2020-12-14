import styled from "styled-components";
import { MEDIA_QUERY_MD, MEDIA_QUERY_LG } from "../constants/style";
import PropTypes from "prop-types";

export const FormBorderDiv = styled.div`
  background: #fad312;
  width: 100%;
  height: 10px;
  overflow: hidden;
`;
export const FormWrapper = styled.form`
  overflow: auto;
  width: 50%;
  margin: 0 auto;
  margin-top: 120px;
  margin-bottom: 120px;
  border-radius: 8px;
  box-shadow: 1.8px 2.4px 5px 0px rgba(0, 0, 0, 0.3);

  ${MEDIA_QUERY_LG} {
    margin-top: 10%;
    margin-bottom: 10%;
    width: 80%;
  }

  ${MEDIA_QUERY_MD} {
    width: 90%;
  }
`;
export const Wrapper = styled.div`
  padding: 54px 40px;
  background: white;
`;
export const FormTitle = styled.h1`
  font-size: 36px;
  color: black;
  font-weight: bold;
  margin-bottom: 35px;
`;
export const FormDesc = styled.p`
  font-size: ${(props) => (props.remind ? "16px" : "14px")};
  color: ${(props) => (props.remind ? "#e74149" : "black")};
  line-height: 2em;
  font-weight: bold;
`;
export const FormQuestion = styled.div`
  color: black;
  font-weight: 550;
  font-size: 20px;
  margin: 55px 0 20px 0;
  margin-right: 15px;

  & > div {
    margin-top: 12px;
    color: black;
    font-size: 14px;
  }

  ${(props) =>
    props.isRequired &&
    `
    &::after {
      content: "*";
      color: #e74149;
    }`}
`;

const FormInput = styled.input`
  box-sizing: border-box;
  font-size: 16px;
  width: 300px;
  border: 0px;
  color: #414141;
  border-bottom: #afafaf 1px solid;
  padding-bottom: 5px;
  outline-color: transparent;
  transition: ease-out 0.2s all;

  ${MEDIA_QUERY_LG} {
    width: 230px;
  }

  ${MEDIA_QUERY_MD} {
    width: 180px;
  }

  &::placeholder {
    color: #afafaf;
  }

  &:focus {
    border-bottom: #fad312 3px solid;
  }
`;

const FormInputRemind = styled.p`
  font-size: 14px;
  color: #e74149;
  font-weight: bold;
  ${(props) => !props.setRemind && `display: none`}
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  vertical-align: middle;

  div {
    padding: 10px 0px;
  }
`;
export const ButtonSubmit = styled.button`
  margin: 55px 0 20px 0;
  display: block;
  background: #fad312;
  font-size: 16px;
  padding: 13px 30px;
  border: none;
  border-radius: 3px;
  font-weight: 600;
  cursor: pointer;
  transition: ease-in all 0.2s;

  &:focus {
    border: none;
    outline: none;
  }

  &:hover {
    background: #fada3c;
    transform: scale(1.05);
  }
`;

function RadioItem({ name, id, value, type, handleChange }) {
  return (
    <div>
      <label>
        <input
          type="radio"
          id={id}
          name={name}
          data-value={value}
          checked={type === Number(id)}
          onChange={handleChange}
        />
        {value}
      </label>
    </div>
  );
}

export function FormInputItem({
  name,
  type,
  value,
  question,
  isRequired,
  handleInputChange,
  setRemind,
}) {
  return (
    <section>
      <FormQuestion isRequired={isRequired}>{question}</FormQuestion>
      <FormInput
        name={name}
        type={type}
        placeholder="您的回答"
        value={value}
        onChange={handleInputChange}
      />
      {isRequired && (
        <FormInputRemind setRemind={setRemind}>
          請輸入{question}
        </FormInputRemind>
      )}
    </section>
  );
}

export function FormRadioItem({ name, type, handleInputChange }) {
  return (
    <RadioGroup>
      <RadioItem
        name={name}
        id="1"
        value="躺在床上用想像力實作"
        type={type}
        handleChange={handleInputChange}
      />
      <RadioItem
        name={name}
        id="2"
        value="趴在地上滑手機找現成的"
        type={type}
        handleChange={handleInputChange}
      />
    </RadioGroup>
  );
}

RadioItem.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  handleChange: PropTypes.func,
};

FormInputItem.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  question: PropTypes.string,
  isRequired: PropTypes.bool,
  handleInputChange: PropTypes.func,
  setRemind: PropTypes.bool,
};

FormRadioItem.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  handleInputChange: PropTypes.func,
};
