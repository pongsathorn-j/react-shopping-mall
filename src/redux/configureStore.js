import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";
import { encryptTransform } from "redux-persist-transform-encrypt";

import rootReducer from "./reducers";

const persistConfig = {
  key: "root",
  storage,
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_REDUX_SECRETKEY,
      onError: function (error) {
        console.log(error);
        // Handle the error.
      },
    }),
  ],
  whitelist: ['authReducer', 'themeReducer']
};


const persistedReducer = persistReducer(persistConfig, rootReducer);

const isProduction = process.env.NODE_ENV === "production";

const configureStore = () => {
  let store = createStore(
    persistedReducer,
    isProduction
      ? applyMiddleware(thunk)
      : composeWithDevTools(applyMiddleware(thunk))
  );
  let persistor = persistStore(store);
  return { store, persistor };
};

export default configureStore;
