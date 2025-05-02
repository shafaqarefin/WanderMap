import styles from "./CityItem.module.css";
import { formatDate } from "../utils/formatDate";
import { Link } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";
function CityItem({ city }) {
  const { cityName, emoji, date, id, position } = city;
  const { currentCity, deleteCity } = useCities();

  function handleDelete(e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li key={id}>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          currentCity.id === id ? styles["cityItem--active"] : ""
        }`}
        key={id}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={(e) => handleDelete(e)}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
