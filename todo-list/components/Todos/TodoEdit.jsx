const { connect } = ReactRedux;

import { saveTodo } from '../../store/actions/TodoActions.js';
import { setAlert } from '../../store/actions/AlertActions.js';

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
    if (this.state.title === '') {
      setAlert({ txt: 'You Cant Add Empty Todo', type: 'dark' });
      return;
    }
    saveTodo(this.state);
    setAlert({ txt: 'Todo Successfully Updated', type: 'warning' });
    this.props.onSetCurrent();
    this.setState({ title: '' });
  };

  render() {
    return (
      <React.Fragment>
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
  };
};

const mapDispatchToProps = {
  saveTodo,
  setAlert,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoEdit);
