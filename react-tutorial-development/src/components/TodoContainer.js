import React, { useState, useEffect } from 'react';
import { v4 } from 'uuid';
import Header from './Header';
import InputTodo from './InputTodo';
import TodosList from './TodosList';

const TodoContainer = () => {
  const getInitialTodos = () => {
    const rawData = localStorage.getItem('todos');
    const data = JSON.parse(rawData);
    return data || [];
  };

  const [todos, setTodos] = useState(getInitialTodos());

  useEffect(() => {
    const rawData = localStorage.getItem('todos');
    if (rawData) {
      const data = JSON.parse(rawData);
      setTodos(data);
    }
  }, [setTodos]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleChange = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      }),
    );
  };

  const deleteTodo = (id) => {
    setTodos([...todos.filter((todo) => todo.id !== id)]);
  };

  const setUpdate = (updatedTitle, id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            title: updatedTitle,
          };
        }
        return todo;
      }),
    );
  };

  const addTodoItem = (title) => {
    const newTodo = {
      id: v4(),
      title,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  return (
    <div className="container">
      <div className="inner">
        <Header />
        <InputTodo
          addTodoProps={addTodoItem}
        />
        <TodosList
          todos={todos}
          handleChangeProps={handleChange}
          deleteTodoProps={deleteTodo}
          setUpdate={setUpdate}
        />
      </div>
    </div>
  );
};

export default TodoContainer;
