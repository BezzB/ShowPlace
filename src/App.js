import React from 'react'
import "./styles/bootstrap/css/bootstrap.min.css"
import Navbar from './components/pages/Navbar'
import './App.scss'
import { Route, Routes } from 'react-router-dom'
import { routes } from './routes/routes'
import { Footer } from './components/footer/Footer'

const App = () => {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.element />}
            />
          ))}
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
