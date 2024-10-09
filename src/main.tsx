import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './i18n'; // 引入 i18n 初始化文件

// @ts-ignore
if (typeof global === 'undefined') {
  (window as any).global = globalThis;
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)