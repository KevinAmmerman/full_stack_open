import { useEffect, useState } from 'react';
import countryService from './services/countries';
import CountryDisplay from './components/CountryDisplay';
import getWeather from './services/weather';

function App() {
  const [value, setValue] = useState('');
  const [countries, setCountries] = useState([]);
  const [weather, setWeather] = useState(null);
  const [currentWeatherCity, setCurrentWeatherCity] = useState(null);
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(value)
  );

  useEffect(() => {
    if (value.length === 0) {
      countryService.getAll().then((countries) => setCountries(countries));
    }
  }, [value]);

  useEffect(() => {
    if (filteredCountries.length === 1) {
      const country = filteredCountries[0];
      const capital = country.capital;

      if (currentWeatherCity !== capital) {
        getWeather(capital).then((weatherData) => {
          setWeather(weatherData);
          setCurrentWeatherCity(capital);
        });
      }
    } else {
      setWeather(null);
      setCurrentWeatherCity(null);
    }
  }, [filteredCountries, currentWeatherCity]);

  const handleChange = (event) => {
    setValue(event.target.value.toLowerCase());
  };

  const handleShowCountry = (country) => setCountries([country]);

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
        <CountryDisplay
          countries={filteredCountries}
          searchTerm={value}
          handleShowCountry={handleShowCountry}
          weather={weather}
        />
      </div>
    </>
  );
}

export default App;
