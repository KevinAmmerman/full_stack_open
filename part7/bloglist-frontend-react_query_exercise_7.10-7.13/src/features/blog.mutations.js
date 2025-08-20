import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { notificationActions, useNotificationDispatch } from '../contexts/notificationContext'

export const useAddBlog = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  return useMutation({
    mutationFn: async (newBlog) => blogService.create(newBlog),
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
      dispatch(notificationActions.setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`))
    },
    onError: () => {
      dispatch(notificationActions.setNotification('all fields are required', 'error'))
    },
  })
}
