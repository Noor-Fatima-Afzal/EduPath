import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import './index.css'
import LoginPage from './pages/LoginPage.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import DashboardPage from './pages/DashboardPage.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
	    <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } 
      />
	  </Routes>
  </BrowserRouter>
)
