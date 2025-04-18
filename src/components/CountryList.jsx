import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";

function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;
  if (!cities || cities.length === 0)
    return <Message message={"No countries found. Please add some!"} />;
  const countries = cities.reduce(
    (arr, city) => !arr.includes(city.country),
    []
  );
  console.log(countries);

  // cities.forEach((city) => {
  //   if (!countries.some((c) => c.country === city.country)) {
  //     countries.push({ country: city.country, emoji: city.emoji });
  //   }
  // });

  return (
    <ul className={styles.countryList}>
      {countries.map((country, index) => (
        <CountryItem key={index} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
