import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


import rootReducer from '../src/Components/Reducer/Index';

const store = createStore(rootReducer);

export default store;