/* eslint-disable indent */
import { useReducer, createContext, useContext, useMemo } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return {
        message: action.payload.message,
        notificationType: action.payload.notificationType,
      }
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const notificationActions = {
  setNotification: (message, type = 'success') => ({
    type: 'SET_NOTIFICATION',
    payload: { message, notificationType: type },
  }),

  clearNotification: () => ({
    type: 'CLEAR_NOTIFICATION',
  }),
}

const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  const value = useMemo(() => [notification, notificationDispatch], [notification])

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}

export const useNotificationValue = () => {
  const valueAndDispatch = useContext(NotificationContext)
  return valueAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const valueAndDispatch = useContext(NotificationContext)
  return valueAndDispatch[1]
}

export default NotificationContext
