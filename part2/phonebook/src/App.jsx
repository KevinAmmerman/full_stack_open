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

  const resetInputFields = () => {
    setNewName('');
    setNewNumber('');
  };

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

  const handleContactSubmit = (event) => {
    event.preventDefault();
    const isExisting = isNameExisting();

    if (isExisting !== -1 && newNumber.length === 0) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    if (isExisting !== -1 && newNumber.length !== 0) {
      updateExistingContact(isExisting);
      return;
    }
    addNewContact();
  };

  const addNewContact = () => {
    const newObject = {
      name: newName,
      number: newNumber,
    };
    contactService.create(newObject).then((returnedData) => {
      setPersons(persons.concat(returnedData));
      setFilteredPersons(persons.concat(returnedData));
      resetInputFields();
    });
  };

  const updateExistingContact = (index) => {
    if (
      window.confirm(
        `${newName} is already added to phonebook, replace the old number with the new one?`
      )
    ) {
      const updatedContact = { ...persons[index], number: newNumber };
      contactService.update(updatedContact.id, updatedContact).then((returnedData) => {
        const updatedContacts = persons.map((p) => (p.id === returnedData.id ? returnedData : p));
        setPersons(updatedContacts);
        setFilteredPersons(updatedContacts);
        resetInputFields();
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
    return isExisting;
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
        handleContactSubmit={handleContactSubmit}
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
