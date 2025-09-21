import { useMutation, useQuery } from '@apollo/client/react'
import { useEffect, useState } from 'react'
import { EDIT_BIRTH_YEAR } from '../mutations'
import { ALL_AUTHORS } from '../queries'

const EditBirthYearAuthor = () => {
  const { data: authors, loading } = useQuery(ALL_AUTHORS)
  const [selectedAuthor, setSelectedAuthor] = useState('')
  const [birthYear, setBirthYear] = useState('')

  useEffect(() => {
    if (authors?.allAuthors?.length > 0 && !selectedAuthor) {
      setSelectedAuthor(authors.allAuthors[0].name)
    }
  }, [authors, selectedAuthor])

  const [editBirthYear] = useMutation(EDIT_BIRTH_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.error('Detailed error message:', error.message)
    },
  })

  const submit = (event) => {
    event.preventDefault()
    editBirthYear({ variables: { name: selectedAuthor.trim().toLowerCase(), setBornTo: parseInt(birthYear) } })

    setBirthYear('')
    setSelectedAuthor(selectedAuthor)
  }

  if (loading) return <div>... Loading</div>
  if (!authors?.allAuthors?.length) return <div>No authors found</div>

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <label htmlFor='authorName'>Author </label>
          <select name='authorName' id='authorName' value={selectedAuthor} onChange={({ target }) => setSelectedAuthor(target.value)}>
            {(authors?.allAuthors || []).map((author) => (
              <option key={author.name} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor='birthYear'>Born </label>
          <input value={birthYear} type='number' name='birthYear' id='birthYear' onChange={({ target }) => setBirthYear(target.value)} />
        </div>
        <button type='submit'>Update Author</button>
      </form>
    </div>
  )
}

export default EditBirthYearAuthor
