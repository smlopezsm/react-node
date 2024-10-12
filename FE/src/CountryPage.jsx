import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

const CountryPage = () => {
  const { countryCode } = useParams();
  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);
  //   const [populationData, setPopulationData] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/country-info/${countryCode}`
        );
        const data = await response.json();
        console.log("Datos recibidos:", data); // Verifica los datos

        setCountry({ name: data.countryName, flag: data.flagUrl });
        setBorderCountries(data.borderCountries);
        // setPopulationData(data.populationData);
        // console.log("Datos de población:", data.populationData);
      } catch (error) {
        console.error("Error fetching country: ", error);
      }
    };
    fetchCountry();
  }, [countryCode]);

  //   const populationChartData = {
  //     labels: populationData?.map((data) => data.year) || [],
  //     datasets: [
  //       {
  //         label: "Population Over Time",
  //         data: populationData?.map((data) => data.value) || [],
  //         fill: false,
  //         backgroundColor: "rgba(75,192,192,0.2)",
  //         borderColor: "rgba(75,192,192,1)",
  //       },
  //     ],
  //   };

  return (
    <main>
      {country ? (
        <div>
          <h1>{country.name}</h1>
          <img src={country.flag} alt={country.name} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <section>
        <h2>List of countries that border {country?.name}</h2>
        <ul>
          {borderCountries.map((borderCountryCode) => (
            <li key={borderCountryCode}>
              <a href={`/${borderCountryCode}`}>{borderCountryCode}</a>
            </li>
          ))}
        </ul>
      </section>
      {/* <section>
        <h2>Population Chart</h2>
        {populationData ? (
          <Line data={populationChartData} />
        ) : (
          <p>Loading population data...</p>
        )}
      </section> */}
    </main>
  );
};

export default CountryPage;
