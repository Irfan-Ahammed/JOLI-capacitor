import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import jobSlice from "./jobSlice";
import applicationSlice from "./applicationSlice";
import adminJobSlice from "./adminJobSlice";
import locationSlice from "./locationSlice";
import categorySlice from "./categorySlice";
import saveJobsSlice from "./saveJobsSlice";
import { createRoot } from "react-dom/client";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth", "category", "saveJobs"] // Only persist auth slice
};

const rootReducer = combineReducers({
  auth: authSlice,
  job: jobSlice,
  adminJob: adminJobSlice,
  application: applicationSlice,
  location: locationSlice,
  category: categorySlice,
  saveJobs: saveJobsSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export default store;
