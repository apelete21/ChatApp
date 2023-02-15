import React, { useContext } from 'react'
import { Alert, Button, Form, Row, Col, Stack } from 'react-bootstrap'
import { AuthContext } from '../Context/Context'

function Login() {

    const { loginInfo, updateLoginInfo, loginUser, loginError, isLoginLoading } = useContext(AuthContext)

    return (
        <>
            <Form onSubmit={loginUser}>
                <Row style={{
                    // height: '100vh',
                    justifyContent: 'center',
                    paddingTop: "10%"
                }}>
                    <Col xs={6}>
                        <Stack gap={3}>
                            <h2>Login</h2>

                            <Form.Control type='email' placeholder='Email'
                                onChange={(e) => updateLoginInfo({
                                    ...loginInfo, email: e.target.value
                                })}
                            />
                            <Form.Control type='password' placeholder='Password'
                                onChange={(e) => updateLoginInfo({
                                    ...loginInfo, password: e.target.value
                                })}
                            />

                            <Button variant='primary' type='submit'>
                                {isLoginLoading ? 'Login, please wait...' : 'Login'}
                            </Button>

                            {loginError &&
                                <Alert variant='danger'>
                                    <p>{loginError?.message}</p>
                                </Alert>
                            }
                        </Stack>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default Login
