import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';
import { FaPlusCircle } from 'react-icons/fa';

const InputTodo = (props) => {
  const [inputText, setInputText] = useState({
    title: '',
  });

  const onChange = (e) => {
    setInputText({
      ...inputText,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    const { addTodoProps } = props;
    e.preventDefault();
    if (inputText.title.trim()) {
      addTodoProps(inputText.title);
      setInputText({
        title: '',
      });
    } else {
      // eslint-disable-next-line no-alert
      alert('Input field should not be empty.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input
        type="text"
        placeholder="Add Todo..."
        className="input-text"
        name="title"
        value={inputText.title}
        onChange={onChange}
      />
      <IconContext.Provider
        value={{
          color: 'darkcyan',
          style: { fontSize: '20px' },
          className: 'submit-icon',
        }}
      >
        <button type="submit" className="input-submit">
          <FaPlusCircle />
          <FaPlusCircle />
          <FaPlusCircle />
        </button>
      </IconContext.Provider>

    </form>
  );
};

InputTodo.propTypes = {
  addTodoProps: PropTypes.func.isRequired,
};

export default InputTodo;
