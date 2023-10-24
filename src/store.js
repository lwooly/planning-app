import { createStore, applyMiddleware} from "redux";
import ThunkMiddleware  from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducer";
import delayedMessagesMiddleware from "./exampleAddOns/delayedMessagesMiddleware";


const composedEnhancer = composeWithDevTools(applyMiddleware(ThunkMiddleware))
const store = createStore(rootReducer, composedEnhancer)

export default store
