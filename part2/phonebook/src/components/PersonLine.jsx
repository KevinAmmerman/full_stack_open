const PersonLine = ({ person }) => {
  return (
    <li key={person.name}>
      {person.name} {person.number}
    </li>
  );
};

export default PersonLine;
