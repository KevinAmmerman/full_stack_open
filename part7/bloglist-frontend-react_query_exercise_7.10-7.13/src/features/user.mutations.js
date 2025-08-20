import { useMutation, useQueryClient } from '@tanstack/react-query'
import loginService from '../services/login'
import { notificationActions, useNotificationDispatch } from '../contexts/notificationContext'

export const useUserLogin = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  return useMutation({
    mutationFn: async (userCredentials) => loginService.login(userCredentials),
    onSuccess: async (user) => {
      dispatch(notificationActions.setNotification(`Welcome back ${user.name}`))
    },
    onError: () => dispatch(notificationActions.setNotification('wrong username or password', 'error')),
  })
}
