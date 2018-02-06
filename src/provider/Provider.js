import React from 'react';
import {
   getTodosRequest,
   createTodoRequest,
   makeRequest,
   BASE_URL,
 } from '../utils/api';


const connect = WrappedComponent => (
  class extends React.Component {
    constructor() {
      super();
      this.state = {
        todos: [],
        loading: false,
        error: false
      };
    }

    getTodos = async () => {
      
      this.setState({
        loading: true,
      });

      try {
        const todos = await getTodosRequest();
        this.setState({
          todos: todos.data,
          loading: false,
        })
      } catch (error) {
        this.setState({
          error: true,
          loading: false,
        });
      }

    }

    createTodo = async (title) => {
      const requestObject = {
        title,
        status: 'active',
      }
      try {
        const response = await createTodoRequest(requestObject);
        const todos = [response.data, ...this.state.todos];
        this.setState({
          todos,
        });
      } catch (error) {
        console.log(error);
      }
    }

    deleteTodo = async (id) => {
      const deleteRequestApi = makeRequest(`${BASE_URL}/todos/${id}`, 'DELETE');
      try {
        const response = await deleteRequestApi();
        const todos = this.state.todos
          .filter(todo => todo._id !== response.data._id);
        this.setState({
          todos,
        });
      } catch (error) {
        console.log(error);
      }
    }

    updateTodo = async (id, status) => {
      const updateRequestApi = makeRequest(`${BASE_URL}/todos/${id}`, 'PUT');
      status = status === 'completed' 
        ? 'active' 
        : 'completed';
      const requestObject = {
        status,
      }
      try {
        const response = await updateRequestApi(requestObject);
        const { todos: oldTodos } = this.state;
        const todos = oldTodos
          .reduce((acc, todo) => {
            return todo._id !== response.data._id
              ? [...acc, todo]
              : [...acc, response.data]
          }, []);
        // finally set the state
        this.setState({
          todos,
        });
      } catch (error) {
        console.log(error);
      }
    }

    render() {
      return (
        <WrappedComponent
          getTodos={this.getTodos} 
          createTodo={this.createTodo}
          deleteTodo={this.deleteTodo}
          updateTodo={this.updateTodo}
          {...this.state} 
        />
      )
    }
  }
)

export default connect;
