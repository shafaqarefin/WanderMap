import { createContext, useContext, useEffect, useState } from "react";
const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [isLoading, setisLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [currentCity, setCurrentCity] = useState({});

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

  async function getCityById(id) {
    try {
      setisLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (error) {
      alert(`Error: ${error}`);
    } finally {
      setisLoading(false);
    }
  }

  async function createNewCity(newCity) {
    try {
      setisLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setCities((cities) => [...cities, data]);
    } catch (error) {
      alert(`Error: ${error}`);
    } finally {
      setisLoading(false);
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        isLoading,
        setisLoading,
        cities,
        getCityById,
        currentCity,
        createNewCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  return context;
}

export { CitiesProvider, useCities };
