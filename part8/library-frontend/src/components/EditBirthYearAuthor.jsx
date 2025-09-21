import { useMutation } from '@apollo/client/react'
import { useState } from 'react'
import { EDIT_BIRTH_YEAR } from '../mutations'
import { ALL_AUTHORS } from '../queries'

const EditBirthYearAuthor = () => {
  const [name, setName] = useState('')
  const [birthYear, setBirthYear] = useState('')

  const [editBirthYear] = useMutation(EDIT_BIRTH_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.error('Detailed error message:', error.message)
    },
  })

  const submit = (event) => {
    event.preventDefault()

    editBirthYear({ variables: { name: name.trim().toLowerCase(), setBornTo: parseInt(birthYear) } })

    setBirthYear('')
    setName('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <label htmlFor='name'>Author name</label>
          <input value={name} type='text' name='name' id='name' onChange={({ target }) => setName(target.value)} />
        </div>
        <div>
          <label htmlFor='birthYear'>Born</label>
          <input value={birthYear} type='number' name='birthYear' id='birthYear' onChange={({ target }) => setBirthYear(target.value)} />
        </div>
        <button type='submit'>Update Author</button>
      </form>
    </div>
  )
}

export default EditBirthYearAuthor
