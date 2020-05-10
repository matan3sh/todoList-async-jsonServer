const { connect } = ReactRedux;

const Alert = ({ alert }) => {
  if (alert) {
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

export default connect(mapStateToProps)(Alert);
