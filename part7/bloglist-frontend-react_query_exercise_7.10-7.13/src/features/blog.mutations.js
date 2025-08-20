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

export const useDeleteBlog = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  return useMutation({
    mutationFn: async (blogId) => blogService.deleteBlog(blogId),
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs'])
      dispatch(notificationActions.setNotification('Blog successfully deleted'))
    },
    onError: () => {
      dispatch(notificationActions.setNotification('deleting blog failed', 'error'))
    },
  })
}

export const useUpdateBlog = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  return useMutation({
    mutationFn: async (blogObject) => blogService.update(blogObject),
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog))
      )
    },
    onError: () => {
      dispatch(notificationActions.setNotification('Something went wrong, try again', 'error'))
    },
  })
}
