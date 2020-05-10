const Alert = ({ alertMsg }) => {
  return (
    <div className={`alert bg-${alertMsg.type} text-center bold`}>
      {alertMsg.txt}
    </div>
  );
};

export default Alert;
