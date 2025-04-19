import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";

const BASE_URL = "http://localhost:8000";

function App() {
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
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />}></Route>
          <Route path="/product" element={<Product />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
          <Route path="/pricing" element={<Pricing />}></Route>
          <Route path="app" element={<AppLayout />}>
            <Route
              index
              element={
                <Navigate to="cities" replace>
                  <CityList cities={cities} isLoading={isLoading} />
                </Navigate>
              }
            ></Route>
            <Route
              path="countries"
              element={<CountryList isLoading={isLoading} cities={cities} />}
            ></Route>
            <Route
              path="cities"
              element={<CityList cities={cities} isLoading={isLoading} />}
            ></Route>
            <Route path="cities/:id" element={<City />}></Route>
            <Route path="form" element={<Form />}></Route>
          </Route>

          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
