import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS } from '../queries'

const Books = () => {
  const { data: books, loading, error } = useQuery(ALL_BOOKS)

  if (loading) return <div>Loading...</div>
  if (books?.allBooks?.length) return <div>No books found</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <h2>Books</h2>

      <table>
        <tbody>
          <tr>
            <th style={{ textAlign: 'left' }}>Title</th>
            <th style={{ textAlign: 'left' }}>Author</th>
            <th style={{ textAlign: 'left' }}>Published</th>
          </tr>
          {(books?.allBooks || []).map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
