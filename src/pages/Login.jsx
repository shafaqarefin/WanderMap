import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import Button from "../components/Button";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("abcd");
  const { login, isAuthenticated, googleLogin } = useAuth();
  const navigate = useNavigate();

  console.log(isAuthenticated);
  function handleSubmitLoginForm(e) {
    e.preventDefault();
    if (email && password) login(email, password);
  }

  useEffect(
    function () {
      if (isAuthenticated) navigate("/app", { replace: true });
    },
    [isAuthenticated, navigate]
  );

  return (
    <main className={styles.login}>
      <form className={styles.form} onSubmit={handleSubmitLoginForm}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div className="btn-layout">
          <Button type={"primary"}>Login</Button>
        </div>
      </form>
      <Button onClick={() => googleLogin()} type={"primary"}>
        <FaGoogle style={{ marginRight: "8px" }} />
        Continue with Google
      </Button>
    </main>
  );
}
