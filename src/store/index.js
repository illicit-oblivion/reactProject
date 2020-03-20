import {createStore, applyMiddleware} from "redux"
import reducer from "../reducer"
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from "../middlewares/logger"
import randomId from "../middlewares/randomId"
import api from "../middlewares/api"
import thunk from "redux-thunk";

const enhancer = applyMiddleware(thunk,logger, randomId,api);
const store = createStore(reducer, composeWithDevTools(
    // other store enhancers if any
),enhancer);

window.store=store;

export default store
