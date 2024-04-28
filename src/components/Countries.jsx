import { useEffect, useState } from "react";
import "./Countries.css";
import axios from "axios";

const CountryCard = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://restcountries.com/v3.1/all`);
        setCountries(res.data);
      } catch (error) {
        console.log("Error fetching data", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) return <div className="error"> Loading Countries...</div>;

  if (error) return <div className="error">Error: {error.message}</div>;

  const filteringCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <nav className="navbar">
        <div className="search-bar">
          <input
            type="search"
            value={search}
            placeholder="Search for country..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </nav>
      <div className="country-grid">
        {filteringCountries.map((country) => (
          <>
            <div className="country-card">
              <img src={country.flags.svg} alt={country.flags.alt} />
              <p>{country.name.common}</p>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default CountryCard;
