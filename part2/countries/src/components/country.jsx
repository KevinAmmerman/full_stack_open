const Country = ({ countries, searchTerm }) => {
  if (searchTerm.length === 0) {
    return <p>Please enter a search term</p>;
  } else if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length === 1) {
    console.log(countries);
    const country = countries[0];
    return (
      <div>
        <h1>{country.name.common}</h1>
        <span>Capital: {country.capital}</span>
        <br />
        <span>Area: {country.area}</span>
        <h2>Languages</h2>
        <ul>
          {Object.entries(country.languages).map((lan, index) => (
            <li key={index}>{lan[1]}</li>
          ))}
        </ul>
        <img
          src={country.flags.png}
          alt={country.flags.alt}
        />
      </div>
    );
  }
  return (
    <ul>
      {countries.map((country) => (
        <li key={country.name.common}>{country.name.common}</li>
      ))}
    </ul>
  );
};

export default Country;
