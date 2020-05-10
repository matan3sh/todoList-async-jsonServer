import TodoReducer from './reducers/TodoReducer.js';
import AlertReducer from './reducers/AlertReducer.js';

const { createStore, combineReducers, applyMiddleware, compose } = Redux;

const thunk = ReduxThunk.default;

const rootReducer = combineReducers({
  todoApp: TodoReducer,
  alert: AlertReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
