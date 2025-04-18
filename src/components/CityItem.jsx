import styles from "./CityItem.module.css";
import { formatDate } from "../utils/formatDate";
function CityItem({ city }) {
  const { cityName, emoji, date, id } = city;

  return (
    <li className={styles.cityItem} key={id}>
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>{formatDate(date)}</time>
      <button className={styles.deleteBtn}>&times;</button>
    </li>
  );
}

export default CityItem;
