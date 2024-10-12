const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/api/available-countries", async (req, res) => {
  try {
    const response = await axios.get(
      "https://date.nager.at/api/v3/AvailableCountries"
    );
    res.json(response.data);
  } catch (error) {
    console.error("error: ", error);
    res.status(500).json({ error: "error" });
  }
});

app.get("/api/country-info/:countryCode", async (req, res) => {
  const { countryCode } = req.params;
  try {
    const countryInfoResponse = await axios.get(
      `https://date.nager.at/api/v3/CountryInfo/${countryCode}`
    );

    const populationResponse = await axios.get(
      "https://countriesnow.space/api/v0.1/countries/population"
    );

    // const countryData = populationResponse.data.data.find(
    //   (country) => country.code === countryCode
    // );

    // Manejar el caso en el que no se encuentra el país
    // if (!countryData) {
    //   console.error("No se encontró el país con el código:", countryCode);
    //   return res.status(404).json({ error: "País no encontrado" });
    // }

    const flagResponse = await axios.get(
      "https://countriesnow.space/api/v0.1/countries/flag/images"
    );

    const flagData = flagResponse.data.data.find(
      (flag) => flag.iso2 === countryCode
    );

    const flagUrl = flagData ? flagData.flag : null;

    // const populationData = countryData.populationCounts || [];

    // console.log("Población recibida: ", populationResponse.data);

    const result = {
      countryName: countryInfoResponse.data.commonName,
      borderCountries: countryInfoResponse.data.borders.map(
        (border) => border.countryCode
      ),
      populationData: populationData,
      flagUrl: flagUrl,
    };

    res.json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(port, () => {
  console.log(`listen on port ${port}`);
});
