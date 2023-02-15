import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Chat from './pages/Chat'
import Login from './pages/Login'
import Register from './pages/Register'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import NavBar from './components/Navbar'
import { AuthContext } from './Context/Context'

function App() {

  const { user } = useContext(AuthContext)

  return (
    <>
      <NavBar />
      <Container className='text-secondary'>
        <Routes>
          <Route path='/' element={user ? <Chat /> : <Login />} />
          <Route path='/register' element={user ? <Chat /> : <Register />} />
          <Route path='/login' element={user ? <Chat /> : <Login />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Container>
    </>
  )
}

export default App