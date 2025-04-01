import { useEffect, useState } from 'react';
import countryService from './services/countries';
import Country from './components/country';

function App() {
  const [value, setValue] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    countryService.getAll().then((countries) => setCountries(countries));
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(value)
  );

  const handleChange = (event) => {
    setValue(event.target.value.toLowerCase());
  };

  return (
    <>
      <div>
        find countries:{' '}
        <input
          type='text'
          value={value}
          onChange={handleChange}
        />
      </div>
      <div>
        <Country
          countries={filteredCountries}
          searchTerm={value}
        />
      </div>
    </>
  );
}

export default App;
