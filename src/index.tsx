import React from 'react'
import { createRoot } from 'react-dom/client'
import App from 'app/App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import { store, persistor } from 'app/store'
import { PersistGate } from 'redux-persist/integration/react'
import { Loader } from 'app/components'

import 'react-perfect-scrollbar/dist/css/styles.css'

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
