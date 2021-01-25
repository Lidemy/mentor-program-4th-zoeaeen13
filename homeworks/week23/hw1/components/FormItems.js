import styled from "styled-components";
import { MEDIA_QUERY_MD } from "../constants/style";
import PropTypes from "prop-types";
import { TypeContext } from "../contexts";
import { useContext } from "react";
import { FILTERS } from "../constants/filters";

const FormWrapper = styled.form`
  box-sizing: border-box;
  border-radius: 1.5px;
  padding: 10px 0 20px 0;
  width: 100%;
  background: #5eaaa8;
  text-align: center;

  h1 {
    margin: 10px;
    font-size: 2rem;
    color: white;
  }
`;

const InputWrapper = styled.div`
  margin: 0 auto;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    margin: 0 10px;
  }

  input {
    box-sizing: border-box;
    border: none;
    border-radius: 3px;
    padding: 5px;
    width: 70%;
    background: #a3d2ca;

    &:focus {
      outline: none;
    }
  }
`;

const SectionWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background: white;

  ${MEDIA_QUERY_MD} {
    flex-wrap: wrap;
    justify-content: center;

    button {
      margin: 10px 0;
    }

    div {
      margin: 0 10px;
    }
  }
`;

function RadioButton({ typeName, filter, handleFilter }) {
  const handleClick = () => {
    handleFilter(typeName);
  };
  return (
    <label
      className={`btn btn-secondary ${filter === typeName ? "active" : ""}`}
    >
      <input type="radio" name="options" id={typeName} onClick={handleClick} />
      {typeName}
    </label>
  );
}

RadioButton.propTypes = {
  typeName: PropTypes.string,
  filter: PropTypes.string,
  handleFilter: PropTypes.func,
};

export function Form({ value, handleInputChnage, handleAddTodo }) {
  return (
    <FormWrapper onSubmit={handleAddTodo}>
      <h1>TODOs</h1>
      <InputWrapper>
        <input
          type="text"
          placeholder="Let's do something!"
          onChange={handleInputChnage}
          value={value}
        />
        <button className="btn btn-light">Add</button>
      </InputWrapper>
    </FormWrapper>
  );
}

Form.propTypes = {
  value: PropTypes.string,
  handleInputChnage: PropTypes.func,
  handleAddTodo: PropTypes.func,
};

export function FormButtons({ handleClearTodos, handleFilter }) {
  const { filter } = useContext(TypeContext);
  const typeList = [FILTERS.ALL, FILTERS.COMPLETED, FILTERS.INCOMPLETE];

  return (
    <SectionWrapper>
      <button className="btn btn-danger" onClick={handleClearTodos}>
        Clear
      </button>
      <div className="btn-group btn-group-toggle" data-toggle="buttons">
        {typeList.map((type, index) => (
          <RadioButton
            key={index}
            typeName={type}
            filter={filter}
            handleFilter={handleFilter}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}

FormButtons.propTypes = {
  handleClearTodos: PropTypes.func,
  handleFilter: PropTypes.func,
};
