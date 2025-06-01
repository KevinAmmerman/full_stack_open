const Notification = ({ message }) => {
  if (!message) {
    return null
  } else {
    return <div className={message[1] ? 'success' : 'error'}>{message[0]}</div>
  }
}

export default Notification
