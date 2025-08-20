import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'

export const useBlogs = () =>
  useQuery({
    queryKey: ['blogs'],
    queryFn: async () => blogService.getAll(),
  })
