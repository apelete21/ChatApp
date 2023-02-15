import React, { useContext } from 'react'
import { Button, Container, Nav, Navbar, Stack } from 'react-bootstrap'
import { json, Link } from 'react-router-dom'
import { AuthContext } from '../Context/Context'

function NavBar() {
  const { user, LogOut } = useContext(AuthContext)
  console.log()
  return (
    <>
      <Navbar bg='dark' className="mb-4" style={{
        height: "3.75rem"
      }}>
        <Container>
          <h2>
            <Link to='/' className='link-light text-decoration-none'>
              Chat App
            </Link>
          </h2>
          {user && <span className="text-warning">Logged in as {user?.name}</span>}
          <Nav>
            <Stack direction='horizontal' gap={3}>
              {!user ?
                <>
                  <Link to='/login' className='link-light text-decoration-none'>
                    Login
                  </Link>
                  <Link to='/register' className='link-light text-decoration-none'>
                    Register
                  </Link>
                </>
                :
                <Button variant='danger' onClick={LogOut}>
                  Log Out
                </Button>
              }
            </Stack>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar
