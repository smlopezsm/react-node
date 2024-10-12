import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/available-countries"
        );
        const data = await response.json();
        setCountries(data);
        console.log(data); // Verifica que contenga la lista de países
      } catch (error) {
        console.error("Error fetching countries: ", error);
      }
    };
    fetchCountries();
  }, []);

  return (
    <main>
      <h1>Countries</h1>
      <section>
        <ul>
          {countries.map((country) => {
            return (
              <li key={country.countryCode}>
                <a href={`/${country.countryCode}`}>{country.name}</a>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default App;
