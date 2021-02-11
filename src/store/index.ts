import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
//import { combineReducers } from 'redux-starter-kit';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import sagas from './sagas';
import reducers from './reducers';
import Packs from './packs';

const reducer = combineReducers(reducers);
export type IState = ReturnType<typeof reducer>;

export default () => {
  const composeEnhancers = composeWithDevTools({});
  const sagaMiddleware = createSagaMiddleware();
  const history = createBrowserHistory();
  const routerMiddlewareWithHistory = routerMiddleware(history);
  const middlewares = applyMiddleware(sagaMiddleware, routerMiddlewareWithHistory);

  const appReducer = combineReducers({
    router: connectRouter(history),
    ...Object.keys(Packs).reduce((accum, key) => {
      accum[key] = Packs[key].reducer;
      return accum;
    }, {}),
  });

  const store = createStore(appReducer, composeEnhancers(middlewares));

  sagaMiddleware.run(sagas);

  return { store, history };
};
