const User = ({ user, handleLogout }) => {
  return (
    <>
      <h2>blogs</h2>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <h4>{user.name} logged in</h4>
        <button
          style={{ maxHeight: 'min-content', marginLeft: '8px' }}
          onClick={handleLogout}
        >
          logout
        </button>
      </div>
    </>
  )
}

export default User
