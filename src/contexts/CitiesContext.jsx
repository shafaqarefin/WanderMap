import { useCallback } from "react";
import { createContext, useContext, useEffect, useReducer } from "react";
import {
  createCity,
  fetchCityById,
  getCitiesByUserId,
  deleteCityApi,
} from "../services/apiCities";
import { useAuth } from "./AuthContext";

const BASE_URL = "http://localhost:8000";
const CitiesContext = createContext();
const initialState = {
  isLoading: false,
  cities: [],
  currentCity: {},
  error: "",
};
function reducer(state, action) {
  switch (action.type) {
    default:
      throw new Error("Unknown Action");

    case "cities/loaded":
      console.log(action.payload);
      return { ...state, isLoading: false, cities: action.payload };

    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };

    case "loading":
      return { ...state, isLoading: true };

    case "error":
      return;
  }
}

function CitiesProvider({ children }) {
  const { user, isAuthenticated } = useAuth();
  const [{ cities, currentCity, isLoading }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    if (!isAuthenticated || !user?.id) return;

    async function fetchCities() {
      dispatch({ type: "loading" });

      try {
        const cities = await getCitiesByUserId(user.id); // from apiCities.js
        dispatch({ type: "cities/loaded", payload: cities });
      } catch (err) {
        dispatch({ type: "error", payload: err.message });
      }
    }

    fetchCities();
  }, [isAuthenticated, user?.id]);

  const getCityById = useCallback(
    async function getCityById(id) {
      if (String(id) === String(currentCity.id)) {
        return;
      }
      dispatch({ type: "loading" });

      try {
        const data = await fetchCityById(id);
        dispatch({ type: "city/loaded", payload: data });
      } catch (error) {
        alert(`Error: ${error.message || error}`);
        dispatch({ type: "error", payload: error }); //
      }
    },
    [currentCity.id]
  );

  const createNewCity = async (newCity) => {
    try {
      dispatch({ type: "loading" });

      const cityWithUser = { ...newCity, user_id: user?.id };

      const data = await createCity(cityWithUser);
      dispatch({ type: "city/created", payload: data });
    } catch (error) {
      alert(`Error: ${error.message || error}`);
    }
  };

  const deleteCity = async (id) => {
    try {
      await deleteCityApi(id);
      dispatch({ type: "city/deleted", payload: id });
    } catch (error) {
      alert(`Error: ${error}`);
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        isLoading,
        cities,
        getCityById,
        currentCity,
        createNewCity,
        deleteCity,
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
