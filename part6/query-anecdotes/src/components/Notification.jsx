import { useContext } from 'react'
import { useNotificationValue } from '../NotificationContext'

const Notification = () => {
  const message = useNotificationValue()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  // eslint-disable-next-line no-constant-condition
  if (!message) return null

  return <div style={style}>{message}</div>
}

export default Notification
