import PropTypes from 'prop-types'
import { useNotificationDispatch, useNotificationValue, notificationActions } from '../contexts/notificationContext'
import { useEffect } from 'react'

const Notification = () => {
  const notification = useNotificationValue()
  const dispatch = useNotificationDispatch()

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch(notificationActions.clearNotification())
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [notification, dispatch])

  if (!notification) {
    return null
  } else {
    return <div className={notification.notificationType}>{notification.message}</div>
  }
}

export default Notification
