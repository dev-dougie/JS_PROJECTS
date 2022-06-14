import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import DeviceContextProvider from './context/service'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DeviceContextProvider>
      <App />
    </DeviceContextProvider>
  </React.StrictMode>
)
