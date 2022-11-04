import { combineReducers } from 'redux';
import { networkReducer } from './networkReducer';

export const reducers = combineReducers({
    allNetworks:networkReducer
})