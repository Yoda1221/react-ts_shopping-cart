import React  from 'react'
import App    from './App'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ShoppingCartProvider }         from './context/ShoppingCartContext' 

import './index.css'

createRoot(document.getElementById('root') as HTMLElement)
.render(
  <React.StrictMode>
    <BrowserRouter>
      <ShoppingCartProvider>
        <Routes>
            <Route path="/*" element={
              <App />
            } />
        </Routes>
      </ShoppingCartProvider>
    </BrowserRouter>
  </React.StrictMode>
)
