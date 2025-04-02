const CountryListLine = ({ country, handleShowCountry }) => {
  const name = country.name.common;
  return (
    <li key={name}>
      {name}
      <button onClick={() => handleShowCountry(country)}>Show</button>
    </li>
  );
};

export default CountryListLine;
