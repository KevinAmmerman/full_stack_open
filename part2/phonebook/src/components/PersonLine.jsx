const PersonLine = ({ person, handleDelete }) => {
  return (
    <li key={person.name}>
      {person.name} {person.number}
      <button onClick={() => handleDelete(person.id, person.name)}>delete</button>
    </li>
  );
};

export default PersonLine;
