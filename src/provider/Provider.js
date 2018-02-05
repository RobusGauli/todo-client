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

    getTodos = () => {
      this.setState({
        loading: true,
      });

      getTodosRequest()
        .then(todos => {
          this.setState({
            todos: todos.data,
            loading: false
          });
        })
        .catch(error => {
          this.setState({
            error: true,
            loading: false,
          });
        });
    }

    createTodo = (title) => {
      const requestObject = {
        title,
        status: 'active',
      }
      
      createTodoRequest(requestObject)
        .then(response => {
          const todos = [...this.state.todos, response.data];
          this.setState({
            todos,
          });
        })
        .catch(error => {
          console.log(error);
        });
    }

    deleteTodo = (id) => {
      const deleteRequestApi = makeRequest(`${BASE_URL}/todos/${id}`, 'DELETE');
      deleteRequestApi()
        .then(response => {
          const todos = this.state.todos
            .filter(todo => todo._id !== response.data._id);
          this.setState({
            todos,
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
    onFilterPress = (filterType) => {
      if (filterType === 'all') {
          this.getTodos()
      } else {
        const todos = this.state.todos
          .filter(todo => todo.status === filterType);
        this.setState({
          todos,
        });
      }
      
    }

    updateTodo = (id, status) => {
      const updateRequestApi = makeRequest(`${BASE_URL}/todos/${id}`, 'PUT');
      status = status === 'completed' 
        ? 'active' 
        : 'completed';
      const requestObject = {
        status,
      }
      updateRequestApi(requestObject)
        .then(response => {
          const todos = this.state.todos
            .reduce((acc, todo) => {
              return todo._id !== response.data._id 
                ? [...acc, todo]
                : [...acc, response.data]
            }, {});
          
          this.setState({
            todos,
          });
        })
    }

    render() {
      console.log(this.state);
      return (
        <WrappedComponent
          getTodos={this.getTodos} 
          createTodo={this.createTodo}
          deleteTodo={this.deleteTodo}
          updateTodo={this.updateTodo}
          onCompletedFilterPress={this.onFilterPress.bind(this, 'completed')}
          onActiveFilterPress={this.onFilterPress.bind(this, 'active')}
          onAllFilterPress={this.onFilterPress.bind(this, 'all')}
          {...this.state} 
        />
      )
    }
  }
)

export default connect;
