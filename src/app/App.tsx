import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import 'react-loading-skeleton/dist/skeleton.css'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { IntlProvider } from 'react-intl'
import theme from 'app/@core/theme/theme'
import { Loader, Layout } from 'app/components'
import Products from 'app/pages/Products'
import ProductDetail from 'app/pages/ProductDetail'

function App() {
  return (
    <IntlProvider locale="en">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/products" element={<Layout />}>
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
              </Route>
              <Route path="*" element={<Navigate to="/products" />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </IntlProvider>
  )
}

export default App
