import { createContext, useContext, useEffect, useReducer } from "react";
import supabase from "../services/supabase";
const initialState = { user: "", isAuthenticated: false, isLoading: true };

const AuthContext = createContext();
// const DUMMY_USER = {
//   name: "Shafaq",
//   email: "shafaq@example.com",
//   password: "qwerty",
//   avatar: "https://i.pravatar.cc/100?u=zz",
// };

function reducer(state, action) {
  switch (action.type) {
    default:
      throw new Error("Unknown Action");
    case "login":
      console.log(state);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        isLoading: false,
      };

    case "logout":
      return { ...state, isAuthenticated: false, user: "", isLoading: false };
    case "finishLoading":
      return { ...state, isLoading: false };
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated, isLoading }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Email login failed:", error.message);
      return;
    }

    dispatch({ type: "login", payload: data.user });
  }

  async function googleLogin() {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/app`,
      },
    });
  }

  async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout failed:", error.message);
      return;
    }
    dispatch({ type: "logout" });
  }

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (user) {
        dispatch({ type: "login", payload: user });
      } else {
        dispatch({ type: "finishLoading" });
      }

      if (error) console.error("Error getting user:", error.message);
    }

    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ login, logout, isAuthenticated, user, googleLogin, isLoading }}
    >
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
