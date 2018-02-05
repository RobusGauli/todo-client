import React, { Component } from 'react';
import TodoItem from './components/TodoItem';
import { Button, Card } from 'semantic-ui-react';
import Header from './components/Header';
import Form from './components/Form';
import './App.css';
import connect from './provider/Provider';


const ENTER_KEY_CODE = 13;

class App extends Component {
  state = {
    todos: [],
    activeText: ''
  }
  
  componentWillMount = () => {
    document.addEventListener('keydown', this.onKeyDown);
  }

  componentDidMount = () => {
    const { getTodos } = this.props;
    getTodos();
  }

  componentWillUnmount = () => {
    document.removeEventListener('keydown');
  }

  onKeyDown = e => {
    e.keyCode === ENTER_KEY_CODE && this.onAddTaskPress(e);
  }

  onChange = e => console.log(e.target.value) || 
    this.setState({
      activeText: e.target.value,
    })
  
  onAddTaskPress = e => {
    let { activeText } = this.state;
    activeText = activeText.trim();
    
    if (!activeText.length >= 1) {
      return;
    }
    const { createTodo } = this.props;
    createTodo(activeText);
    this.setState({
      activeText: '',
    });
  }
  
  onDeletePress = (id) => {
    const { deleteTodo } = this.props;
    deleteTodo(id)
  }

  onCheckPress = (id, status) => {
    // its time to toggle the boolean
    const { updateTodo } = this.props;
    updateTodo(id, status);
  }

  

 
  render() {
    const {
      activeText,
     } = this.state;
     
     const {
       todos,
       onCompletedFilterPress,
       onAllFilterPress,
       onActiveFilterPress,
     } = this.props;

    const todoViews = todos
      .map((todo, index) => {
        return (
          <TodoItem 
            title={todo.title} 
            key={todo._id}
            completed={todo.status === 'completed'} 
            onDeletePress={this.onDeletePress.bind(this, todo._id)}
            onCheckPress={this.onCheckPress.bind(this, todo._id, todo.status)}
            
          />
        )
      }
    );
    
    const all = todos.length;
    const active = todos.reduce((acc, todo) => todo.status === 'completed' ? acc : acc + 1, 0);
    const completed = all - active;
    
    return (
      <div className="App">
        <div style={styles.container}>
          <Header
            title="TODO"
          />
          <Footer
            all={all}
            completed={completed}
            active={active}
          />
          <Card style={styles.card}>
            <Form 
              onChange={this.onChange}
              activeText={activeText}
            />
            <Button onClick={this.onAddTaskPress}>
              Add
            </Button>
          </Card>
          <Filter 
            onCompletedFilterPress={onCompletedFilterPress}
            onAllFilterPress={onAllFilterPress}
            onActiveFilterPress={onActiveFilterPress}
          />
          <Card >
            {todoViews}
          </Card>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  formContainer: {
    float: 'auto',
  },
};


const Footer = ({ all, completed, active }) => {
  return (
    <div className="footer" style={{
      display: 'flex',
      flex: 1,
      width: 350,
      justifyContent: 'space-between'
    }}>
      <div>{`ALL: ${all}`}</div>
      <div>{`COMPLETED: ${completed}`}</div>
      <div>{`ACTIVE: ${active}`}</div>
    </div>
  )
}

const Filter = ({ 
  onCompletedFilterPress,
  onAllFilterPress,
  onActiveFilterPress,
 }) => {
  return (
    <div className="footer" style={{
      display: 'flex',
      flex: 1,
      width: 350,
      justifyContent: 'space-between'
    }}>
      <a onClick={onAllFilterPress}>{`ALL`}</a>
      <a onClick={onCompletedFilterPress}>{`COMPLETED`}</a>
      <a onClick={onActiveFilterPress}>{`ACTIVE`}</a>
    </div>
  )
}
export default connect(App);
