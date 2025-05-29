
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add Barba.js type declaration to window
declare global {
  interface Window {
    barbaInitialized: boolean;
  }
}

createRoot(document.getElementById("root")!).render(<App />);
