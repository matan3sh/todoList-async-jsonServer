import {
  loadTodos,
  removeTodo,
  saveTodo,
  setTodo,
  showDone,
  showAll,
  showActive,
  loadUser,
  updateUser,
} from '../store/actions/TodoActions.js';
import { setAlert } from '../store/actions/AlertActions.js';
import TodoList from '../components/Todos/TodoList.jsx';
import TodoAdd from '../components/Todos/TodoAdd.jsx';
import TodoEdit from '../components/Todos/TodoEdit.jsx';
import TodoFilter from '../components/Todos/TodoFilter.jsx';
import TodoSearch from '../components/Todos/TodoSearch.jsx';
import Spinner from '../components/Layout/Spinner.jsx';

const { connect } = ReactRedux;

class TodoApp extends React.Component {
  state = { setCurr: false };

  componentDidMount() {
    this.props.loadUser();
    setTimeout(() => this.props.loadTodos(), 1000);
  }

  onDelete = (todoId) => {
    const { setAlert, removeTodo, updateUser } = this.props;
    let newActivity = { txt: 'Removed a Todo', at: Date.now() };
    const user = {
      fullName: this.props.user.fullName,
      activitis: [newActivity, ...this.props.user.activitis],
      prefs: this.props.user.prefs,
    };
    setAlert({ txt: 'Todo Successfully Removed', type: 'success' });
    removeTodo(todoId);
    updateUser(user);
  };

  onSetDone = (todo) => {
    todo.isDone = !todo.isDone;
    this.props.saveTodo(todo);
  };

  onSetCurrent = (todo) => {
    this.setState(({ setCurr }) => ({ setCurr: !setCurr }));
    this.props.setTodo(todo);
  };

  render() {
    const { todos, filtered, showDone, showActive, showAll } = this.props;
    return (
      <React.Fragment>
        <div className='card-form'>
          {this.state.setCurr ? (
            <TodoEdit onSetCurrent={this.onSetCurrent} />
          ) : (
            <TodoAdd />
          )}
        </div>
        <div className='grid-2 card'>
          <div>
            <TodoFilter
              showAll={showAll}
              showActive={showActive}
              showDone={showDone}
            />
          </div>
          <div>
            <TodoSearch />
          </div>
        </div>
        {filtered !== null ? (
          <TodoList
            todos={filtered}
            onDelete={this.onDelete}
            onSetDone={this.onSetDone}
            onSetCurrent={this.onSetCurrent}
          />
        ) : (
          <div>
            {!todos.length ? (
              <Spinner />
            ) : (
              <TodoList
                todos={todos}
                onDelete={this.onDelete}
                onSetDone={this.onSetDone}
                onSetCurrent={this.onSetCurrent}
              />
            )}
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todoApp.todos,
    todo: state.todoApp.currTodo,
    filtered: state.todoApp.filtered,
    user: state.todoApp.user,
  };
};

const mapDispatchToProps = {
  loadTodos,
  loadUser,
  removeTodo,
  updateUser,
  setTodo,
  saveTodo,
  showDone,
  showAll,
  showActive,
  setAlert,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);
