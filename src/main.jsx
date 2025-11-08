import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './components/context/AuthProvider.jsx'
import { BrowserRouter, Route, Routes } from "react-router";
import { LoginForm } from './components/auth/LoginForm.jsx'
import { SignupForm } from './components/auth/SignupForm.jsx'
import { ChatProvider } from './components/context/ChatProvider.jsx'
import AuthLayout from './components/context/AuthLayout.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={<AuthLayout />}
          >
            <Route path='/' element={<App />} />
          </Route>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
