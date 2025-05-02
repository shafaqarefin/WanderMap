import { createContext, useContext, useReducer } from "react";
const iniitalState = { user: "", isAuthenticated: false };
const AuthContext = createContext();
const DUMMY_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function reducer(state, action) {
  switch (action.type) {
    default:
      throw new Error("Unknown Action");
    case "login":
      return { ...state, isAuthenticated: true, user: action.payload };

    case "logout":
      return { ...state, isAuthenticated: false, user: "" };
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    iniitalState
  );

  function login(email, password) {
    if (email === DUMMY_USER.email && password === DUMMY_USER.password) {
      dispatch({ type: "login", payload: DUMMY_USER });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside Auth Provider Scope");
  return context;
}
export { AuthProvider, useAuth };
