import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import Routes from './Routes'
import { UserContextProvider } from './context/UserContext'
import { WebContextProvider } from './context/WebContext'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WebContextProvider>
      <UserContextProvider>
        <Routes />
      </UserContextProvider>
    </WebContextProvider>
  </StrictMode>,
)
