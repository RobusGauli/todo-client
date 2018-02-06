import React, { Component } from 'react';
import TodoItem from './components/TodoItem';
import { Button, Card, Menu, } from 'semantic-ui-react';
import Header from './components/Header';
import Form from './components/Form';
import './App.css';
import connect from './provider/Provider';
import { mapFilter } from './utils/dash';


const ENTER_KEY_CODE = 13;
const FILTER_ALL = 'all';
const FILTER_ACTIVE = 'active';
const FITLER_COMPLETED = 'completed';

class App extends Component {
  state = {
    todos: [],
    filter: FILTER_ALL,
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

  onFilterPress = (filter) => {
    // process the filteration on client side rather than server side request
    this.setState({filter});
  }

  render() {
    const {
      activeText,
      filter,
     } = this.state;
     
     const {
       todos,
       onCompletedFilterPress,
       onAllFilterPress,
       onActiveFilterPress,
     } = this.props;

    const todoViews = mapFilter(
      todos,
      (todo, index) => {
        return (
          <TodoItem 
            title={todo.title} 
            key={todo._id}
            completed={todo.status === 'completed'} 
            onDeletePress={this.onDeletePress.bind(this, todo._id)}
            onCheckPress={this.onCheckPress.bind(this, todo._id, todo.status)}
            
          />
        )
      },
      (todo) => filter === FILTER_ALL
        ? true
        : todo.status === filter 
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
            onCompletedFilterPress={this.onFilterPress.bind(this, FITLER_COMPLETED)}
            onAllFilterPress={this.onFilterPress.bind(this, FILTER_ALL)}
            onActiveFilterPress={this.onFilterPress.bind(this, FILTER_ACTIVE)}
            filter={filter}
          />
          <Card >
            {todoViews}
          </Card>
        <Footer
            all={all}
            completed={completed}
            active={active}
          />
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
  filter,
 }) => {
  const color ='grey'
  return (
    <div className="footer" style={{
      display: 'flex',
      flex: 1,
      width: 350,
      justifyContent: 'space-between'
    }}>
      <Menu color={color} widths={3} style={{
        display: 'flex',
        flex: 1,
        width: 350,
        justifyContent: 'space-between'
      }}>
        <Menu.Item 
          name='all' 
          active={filter === 'all'}
          onClick={onAllFilterPress} 
        />
        <Menu.Item 
          name='completed' 
          active={filter === 'completed'}
          onClick={onCompletedFilterPress} 
        />
        <Menu.Item 
          name='active' 
          active={filter === 'active'} 
          onClick={onActiveFilterPress} 
        />
      </Menu>
    </div>
  )
}
export default connect(App);
