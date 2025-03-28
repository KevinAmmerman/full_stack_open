import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const addNewPerson = (event) => {
    event.preventDefault();
    if (isNameExisting()) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newObject = {
        name: newName,
      };
      setPersons(persons.concat(newObject));
      setNewName('');
    }
  };

  const isNameExisting = () => {
    const isExisting = persons.findIndex(
      (person) =>
        person.name.trim().toLowerCase() === newName.trim().toLowerCase()
    );
    return isExisting === -1 ? false : true;
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type='submit' onClick={addNewPerson}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
