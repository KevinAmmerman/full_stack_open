import CountryListLine from './countryListLine';
import CountryDetails from './CountryDetails';

const CountryDisplay = ({ countries, searchTerm, handleShowCountry, weather }) => {
  if (searchTerm.length === 0) {
    return <p>Please enter a search term</p>;
  } else if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length === 1) {
    return (
      <CountryDetails
        country={countries[0]}
        weather={weather}
      />
    );
  }
  return (
    <ul>
      {countries.map((country) => (
        <CountryListLine
          key={country.name.common}
          country={country}
          handleShowCountry={handleShowCountry}
        />
      ))}
    </ul>
  );
};

export default CountryDisplay;
