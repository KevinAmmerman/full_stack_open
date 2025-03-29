import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response) => {
      setPersons(response.data);
      setFilteredPersons(response.data);
    });
  }, []);

  const handleNameChange = (event) => setNewName(event.target.value);

  const handleNumberChange = (event) => setNewNumber(event.target.value);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    const filterInside = event.target.value.toLowerCase();
    const filtered = persons.filter((person) => {
      const [firstName, lastName] = person.name.toLowerCase().split(' ');
      return (
        firstName.startsWith(filterInside) || lastName.startsWith(filterInside)
      );
    });
    setFilteredPersons(filtered);
  };

  const addNewPerson = (event) => {
    event.preventDefault();
    if (isNameExisting()) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      setPersons(persons.concat(newObject));
      setFilteredPersons(persons.concat(newObject));
      setNewName('');
      setNewNumber('');
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
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add a new Contact</h2>
      <PersonForm
        name={newName}
        number={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addNewPerson={addNewPerson}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
