import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import activeReducer from './features/activeSlice';
import loggingReducer from './features/loggingSlice';
import loggedReducer from './features/loggedSlice';
import subReducer from './features/subSlice';
import { booksApi } from './features/booksSlice'; // RTK Query slice

// Combine only the reducers you want persisted
const rootReducer = combineReducers({
  active: activeReducer,
  logging: loggingReducer,
  logged: loggedReducer,
  sub: subReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Final reducer includes persisted reducers + non-persisted booksApi reducer
const combinedReducer = combineReducers({
  persisted: persistedReducer,
  [booksApi.reducerPath]: booksApi.reducer,
});

export const store = configureStore({
  reducer: combinedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(booksApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
