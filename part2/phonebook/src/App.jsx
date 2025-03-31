import { useState, useEffect } from 'react';
import contactService from './services/contact';
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
    contactService.getAll().then((initialContacts) => {
      setPersons(initialContacts);
      setFilteredPersons(initialContacts);
    });
  }, []);

  const handleNameChange = (event) => setNewName(event.target.value);

  const handleNumberChange = (event) => setNewNumber(event.target.value);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    const filterInside = event.target.value.toLowerCase();
    const filtered = persons.filter((person) => {
      const [firstName, lastName] = person.name.toLowerCase().split(' ');
      return firstName.startsWith(filterInside) || lastName.startsWith(filterInside);
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
      };
      contactService.create(newObject).then((returnedData) => {
        setPersons(persons.concat(returnedData));
        setFilteredPersons(persons.concat(returnedData));
        setNewName('');
        setNewNumber('');
      });
    }
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`delete ${name}?`)) {
      contactService.deleteContact(id).then((returnedData) => {
        const updatedContacts = persons.filter((person) => person.id !== returnedData.id);
        setPersons(updatedContacts);
        setFilteredPersons(updatedContacts);
      });
    }
  };

  const isNameExisting = () => {
    const isExisting = persons.findIndex(
      (person) => person.name.trim().toLowerCase() === newName.trim().toLowerCase()
    );
    return isExisting === -1 ? false : true;
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      <h2>Add a new Contact</h2>
      <PersonForm
        name={newName}
        number={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addNewPerson={addNewPerson}
      />
      <h2>Numbers</h2>
      <Persons
        filteredPersons={filteredPersons}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
