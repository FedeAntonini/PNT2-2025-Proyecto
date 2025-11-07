import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './components/context/AuthProvider.jsx'
import { BrowserRouter, Route, Routes } from "react-router";
import { LoginForm } from './components/auth/LoginForm.jsx'
import { SignupForm } from './components/auth/SignupForm.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<App />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
