const { connect } = ReactRedux;

import { saveTodo, updateUser } from '../../store/actions/TodoActions.js';
import { setAlert, removeAlert } from '../../store/actions/AlertActions.js';
import Alert from '../Layout/Alert.jsx';

class TodoAdd extends React.Component {
  state = {
    title: '',
    isDone: false,
  };

  onChange = (e) => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSumbit = (e) => {
    e.preventDefault();
    const { saveTodo, updateUser, setAlert } = this.props;
    if (this.state.title === '') {
      setAlert({ txt: 'You Cant Add Empty Todo', type: 'dark' });
      setTimeout(() => this.props.removeAlert(), 2500);
      return;
    }
    let newActivity = { txt: 'Added a Todo', at: Date.now() };
    const user = {
      fullName: this.props.user.fullName,
      activitis: [newActivity, ...this.props.user.activitis],
      prefs: this.props.user.prefs,
    };
    saveTodo(this.state);
    updateUser(user);
    setAlert({ txt: 'Todo Successfuly Added', type: 'success' });
    setTimeout(() => this.props.removeAlert(), 2500);
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
              placeholder='Add New Todo'
              value={this.state.title}
              onChange={this.onChange}
            />
          </form>
          <input
            type='submit'
            value='Submit'
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
    user: state.todoApp.user,
    alert: state.alert.alert,
  };
};

const mapDispatchToProps = {
  saveTodo,
  updateUser,
  setAlert,
  removeAlert,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoAdd);