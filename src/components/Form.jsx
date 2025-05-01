// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import useURLPosition from "../hooks/useURLPosition";
import Message from "./Message";
import Spinner from "./Spinner";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat, lng] = useURLPosition();
  const [geoPosLoading, setGeoPosLoading] = useState(false);
  const [geoPosError, setGeoPosError] = useState("");
  const [emoji, setEmoji] = useState("");

  useEffect(
    function () {
      async function fetchCountryFromPosition() {
        try {
          if (!lat && !lng) return;
          setGeoPosLoading(true);
          setGeoPosError("");
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          if (!data.countryName) {
            throw new Error("Please Select a Country Please");
          }
          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
        } catch (error) {
          setGeoPosError(error.message);
        } finally {
          setGeoPosLoading(false);
        }
      }
      fetchCountryFromPosition();
    },

    [lat, lng]
  );
  if (geoPosLoading) return <Spinner />;
  if (geoPosError) return <Message message={geoPosError} />;
  if (!lat && !lng)
    return <Message message={"Start By Clicking on the Map 👆"} />;

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>
      <div className={styles.buttons}>
        <Button
          onClick={(e) => {
            e.preventDefault();
          }}
          type={"primary"}
        >
          Add
        </Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
