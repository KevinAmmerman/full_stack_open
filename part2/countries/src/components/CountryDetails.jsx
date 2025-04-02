const CountryDetails = ({ country, weather }) => {
  const WeatherDetails = ({ weather }) => {
    if (weather) {
      return (
        <div>
          <span>Temperature: {(weather.main.temp - 273.15).toFixed(1)} Celsius</span>
          <br />
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt=''
          />
          <br />
          <span>Wind: {weather.wind.speed} m/s</span>
        </div>
      );
    }
    return <></>;
  };

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
      <h2>Weather in {country.capital}</h2>
      <WeatherDetails weather={weather} />
    </div>
  );
};

export default CountryDetails;
