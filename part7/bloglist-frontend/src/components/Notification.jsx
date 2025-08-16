import PropTypes from 'prop-types'
import { clearMessage } from '../reducers/notificationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

const Notification = () => {
  const dispatch = useDispatch()
  const { message, modificationStatus } = useSelector((state) => state.notification)

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(clearMessage())
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [message, dispatch])

  if (!message) {
    return null
  } else {
    return <div className={modificationStatus}>{message}</div>
  }
}

Notification.propTypes = {}

export default Notification
