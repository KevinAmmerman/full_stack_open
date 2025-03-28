import PersonLine from './PersonLine';

const Persons = ({ filteredPersons }) => {
  return (
    <ul>
      {filteredPersons.map((person) => (
        <PersonLine key={person.id} person={person} />
      ))}
    </ul>
  );
};

export default Persons;
