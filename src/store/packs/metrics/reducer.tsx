import produce from 'immer';
import makeReducer from '../../../@eog/redux-make-reducer';
import * as actions from './actions';

const initialState = {
  loading: true,
  metrics: [],
};

const handlers = {
  [actions.METRICS_RECEIVED]: (state: any, action: any) => {
    return produce(state, () => ({
      loading: false,
      metrics: action.metrics,
    }));
  },
};

export default makeReducer(handlers, initialState);
