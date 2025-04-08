import { useState, useEffect } from 'react';
import contactService from './services/contact';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);

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

  const resetMessage = () => {
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const handleNameChange = (event) => setNewName(event.target.value);

  const handleNumberChange = (event) => setNewNumber(event.target.value);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    const filterInside = event.target.value.toLowerCase();
    const filtered = persons.filter((person) => {
      const [firstName, lastName = ''] = person.name.toLowerCase().split(' ');
      const number = person.number.trim();
      return (
        firstName.startsWith(filterInside) ||
        lastName.startsWith(filterInside) ||
        number.startsWith(filterInside)
      );
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
    contactService
      .create(newObject)
      .then((returnedData) => {
        setPersons(persons.concat(returnedData));
        setFilteredPersons(persons.concat(returnedData));
        resetInputFields();
        return returnedData;
      })
      .then((data) => {
        setMessage([`Added ${data.name}`, true]);
        resetMessage();
      });
  };

  const updateExistingContact = (index) => {
    if (
      window.confirm(
        `${newName} is already added to phonebook, replace the old number with the new one?`
      )
    ) {
      const updatedContact = { ...persons[index], number: newNumber };
      contactService
        .update(updatedContact.id, updatedContact)
        .then((returnedData) => {
          const updatedContacts = persons.map((p) => (p.id === returnedData.id ? returnedData : p));
          setPersons(updatedContacts);
          setFilteredPersons(updatedContacts);
          resetInputFields();
          return returnedData;
        })
        .then((data) => {
          setMessage([`Updated ${data.name}'s number`, true]);
          resetMessage();
        })
        .catch((err) => {
          console.log(err);
          setMessage(
            [`Information of ${err.config.data.name} has already been removed from server`],
            false
          );
          resetMessage();
        });
    }
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`delete ${name}?`)) {
      contactService
        .deleteContact(id)
        .then(() => {
          const updatedContacts = persons.filter((person) => person.id !== id);
          setPersons(updatedContacts);
          setFilteredPersons(updatedContacts);
        })
        .then(() => {
          setMessage([`${name} successfully deleted`, true]);
          resetMessage();
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
      <Notification message={message} />
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
