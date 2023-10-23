import { createStore, applyMiddleware} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducer";
import delayedMessagesMiddleware from "./exampleAddOns/delayedMessagesMiddleware";


const composedEnhancer = composeWithDevTools()
const store = createStore(rootReducer, composedEnhancer)

export default store
