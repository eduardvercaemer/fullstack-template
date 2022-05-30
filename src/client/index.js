import { createRoot } from 'react-dom/client'
import { createElement as e, StrictMode } from 'react'
import App from './App'

const container = document.getElementById('container')
const root = createRoot(container)
root.render(e(StrictMode, {}, e(App)))

