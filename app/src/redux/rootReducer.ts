import { combineReducers } from "redux";
import serviceReducer from "./services/reducer";
import serviceReducerApp from "./appointments/reducers";

const rootReducer = combineReducers({
    service: serviceReducer,
    appointment: serviceReducerApp
})

export default rootReducer;

// export type RootState = ReturnType<typeof rootReducer>;