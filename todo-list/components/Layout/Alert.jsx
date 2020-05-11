import { removeAlert } from '../../store/actions/AlertActions.js';

const { connect } = ReactRedux;

const Alert = ({ alert, removeAlert }) => {
  if (alert) {
    setTimeout(() => removeAlert(), 2500);
    return (
      <div className={`alert bg-${alert.type} text-center bold`}>
        {alert.txt}
      </div>
    );
  } else {
    return <React.Fragment></React.Fragment>;
  }
};

const mapStateToProps = (state) => {
  return {
    alert: state.alert.alert,
  };
};

const mapDispatchToProps = {
  removeAlert,
};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
