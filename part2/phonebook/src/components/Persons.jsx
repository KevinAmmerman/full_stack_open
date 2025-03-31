import PersonLine from './PersonLine';

const Persons = ({ filteredPersons, handleDelete }) => {
  return (
    <ul>
      {filteredPersons.map((person) => (
        <PersonLine
          key={person.id}
          person={person}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

export default Persons;
