import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import { rootPersistConfig, rootReducer } from './rootReducer'

const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
})

const persistor = persistStore(store)

export { store, persistor }

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
