import PropTypes from 'prop-types'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>log in to application</h1>
        <div>
          username
          <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => handleUsernameChange(target.value)}
            placeholder='Username...'
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => handlePasswordChange(target.value)}
            placeholder='Password...'
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </>
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
