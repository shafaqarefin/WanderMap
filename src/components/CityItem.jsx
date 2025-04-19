import styles from "./CityItem.module.css";
import { formatDate } from "../utils/formatDate";
import { Link } from "react-router-dom";
function CityItem({ city }) {
  const { cityName, emoji, date, id, position } = city;

  return (
    <li key={id}>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={styles.cityItem}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
