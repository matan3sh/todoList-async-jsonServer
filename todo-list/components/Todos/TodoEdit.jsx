const { connect } = ReactRedux;

import { saveTodo } from '../../store/actions/TodoActions.js';
import { setAlert, removeAlert } from '../../store/actions/AlertActions.js';
import Alert from '../Layout/Alert.jsx';

class TodoEdit extends React.Component {
  state = {
    title: this.props.todo.title,
    _id: this.props.todo._id,
    isDone: this.props.todo.isDone,
  };

  onChange = (e) => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSumbit = (e) => {
    e.preventDefault();
    const { saveTodo, setAlert } = this.props;
    saveTodo(this.state);
    setAlert({ txt: 'Todo Successfuly Updated', type: 'warning' });
    setTimeout(() => this.props.removeAlert(), 2500);
    this.props.onSetCurrent();
    this.setState({ title: '' });
  };

  render() {
    const { alert } = this.props;
    return (
      <React.Fragment>
        {alert && <Alert alertMsg={alert} />}
        <div className='text-center flex-center'>
          <form onSubmit={this.onSumbit}>
            <input
              type='text'
              name='title'
              placeholder='Add Todo'
              value={this.state.title}
              onChange={this.onChange}
            />
          </form>
          <input
            type='submit'
            value='Update'
            className='btn btn-dark mx-1'
            onClick={this.onSumbit}
          />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todo: state.todoApp.currTodo,
    alert: state.alert.alert,
  };
};

const mapDispatchToProps = {
  saveTodo,
  setAlert,
  removeAlert,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoEdit);
