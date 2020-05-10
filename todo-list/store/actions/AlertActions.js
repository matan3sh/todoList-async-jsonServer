export function setAlert(alert) {
  return (dispatch) => {
    dispatch({ type: 'SET_ALERT', payload: alert });
  };
}

export function removeAlert() {
  return (dispatch) => {
    dispatch({ type: 'REMOVE_ALERT' });
  };
}
