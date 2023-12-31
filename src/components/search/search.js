import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api.js";
import { useNavigate } from "react-router-dom";

const Search = ({ onSearchChange }) => {
  const navigate = useNavigate();

  const [search, setSearch] = useState(null);

  const loadOptions = async (userInput) => {
    try {
      const response = await fetch(
        `${GEO_API_URL}/cities?minPopulation=5000&namePrefix=${userInput}`,
        geoApiOptions
      );
      const result = await response.json();
      return {
        options: result.data.map((city) => {
          return {
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name}, ${city.regionCode}, ${city.countryCode}`,
          };
        }),
      };
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
    navigate("/weather");
  };

  return (
    <AsyncPaginate
      placeholder="Where is candyland?"
      debounceTimeout={750}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};
export default Search;
