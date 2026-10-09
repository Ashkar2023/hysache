import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './app.jsx'
import 'lenis/dist/lenis.css'
import 'react-medium-image-zoom/dist/styles.css'
import './index.css'

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
