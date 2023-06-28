import { combineReducers, configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";
import {setUser} from "./stores/user";


const rootReducer=combineReducers({...reducers})

const initStore = (currentUser: any) => {
    const appStore = configureStore({
      reducer:rootReducer,
    });
    if (currentUser) {
      appStore.dispatch(setUser(currentUser))
    };
  
    return appStore;
  };
  
  export type RootState = ReturnType<typeof rootReducer>;
  export default initStore;
  