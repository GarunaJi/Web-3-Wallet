import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Buffer } from 'buffer';
// Make Buffer available globally
window.Buffer = Buffer;

//Love you 'buffer' bhaiya 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
