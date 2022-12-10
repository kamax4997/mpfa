import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import productsReducer from './slices/products'

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['settings'],
}

const productsPersistConfig = {
  key: 'products',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['productsData'],
}

const rootReducer = combineReducers({
  products: persistReducer(productsPersistConfig, productsReducer),
})

export { rootPersistConfig, rootReducer }
