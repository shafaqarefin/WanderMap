import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import styles from "./User.module.css";

// const FAKE_USER = {
//   name: "Jack",
//   email: "jack@example.com",
//   password: "qwerty",
//   avatar: "https://i.pravatar.cc/100?u=zz",
// };

function User() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();
    logout();
    navigate("/");
  }
  const {
    user_metadata: { name, avatar_url },
  } = user;
  return (
    <div className={styles.user}>
      <img src={avatar_url ?? "/default-avatar.jpg"} alt={name || "User"} />
      <span>Welcome, {name ?? "User"}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;
