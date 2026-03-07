import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { loadLocale } from 'wuchale/load-utils'
import App from './App.tsx'

async function init() {
  // @wc-ignore
  await loadLocale('en');
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

init();
