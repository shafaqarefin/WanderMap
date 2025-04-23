import { createContext, useContext, useEffect, useState } from "react";
const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [isLoading, setisLoading] = useState(false);
  const [cities, setCities] = useState([]);

  useEffect(function () {
    async function fetchCities() {
      try {
        setisLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (error) {
        alert(`Error: ${error}`);
      } finally {
        setisLoading(false);
      }
    }
    fetchCities();
  }, []);
  return (
    <CitiesContext.Provider value={{ isLoading, cities }}>
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  return context;
}

export { CitiesProvider, useCities };
