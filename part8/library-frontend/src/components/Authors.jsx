import { useQuery } from '@apollo/client/react'
import { ALL_AUTHORS } from '../queries'
import EditBirthYearAuthor from './EditBirthYearAuthor'

const Authors = () => {
  const { data: authors, loading, error } = useQuery(ALL_AUTHORS)

  if (loading) return <div>Loading...</div>
  if (!authors?.allAuthors?.length) return <div>No authors found</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Born</th>
            <th>Books</th>
          </tr>
          {(authors?.allAuthors || []).map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set Birth Year</h2>
      <EditBirthYearAuthor />
    </div>
  )
}

export default Authors
