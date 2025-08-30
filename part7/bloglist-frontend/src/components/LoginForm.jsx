import PropTypes from 'prop-types'
import { Button, Form } from 'react-bootstrap'

const LoginForm = ({ handleSubmit, handleUsernameChange, handlePasswordChange, username, password }) => {
  return (
    <Form onSubmit={handleSubmit} style={{ padding: '16px' }}>
      <h1>Log in to application</h1>
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control type='text' value={username} name='Username' onChange={({ target }) => handleUsernameChange(target.value)} placeholder='Username...' />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => handlePasswordChange(target.value)}
          placeholder='Password...'
        />
      </Form.Group>
      <Button variant='primary' style={{ marginTop: '8px' }} type='submit'>
        Login
      </Button>
    </Form>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm
