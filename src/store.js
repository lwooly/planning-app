import { createStore, compose, applyMiddleware} from "redux";
import rootReducer from "./reducer";
import delayedMessagesMiddleware from "./exampleAddOns/delayedMessagesMiddleware";


const middlewareEnhancer = applyMiddleware(delayedMessagesMiddleware)
const store = createStore(rootReducer, middlewareEnhancer)

export default store;
