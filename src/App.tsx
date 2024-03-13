import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { LoginPage } from "./pages/LoginPage";
import { AuthPage } from "./pages/AuthPage";
import { Dashboard } from "./pages/Dashboard";

const serverUrl = import.meta.env.VITE_SERVER_URI;
type LoggedState = "loading" | "authenticated" | "unauthenticated";
function App() {
  const [loggedState, setLoggedState] = useState<LoggedState>("loading");
  const checkLoginState = useCallback(async () => {
    try {
      const request = await fetch(`${serverUrl}/auth/verify-token`);
      const { loggedIn, data } = await request.json();
      if (loggedIn) {
        setLoggedState("authenticated");
      }
      throw new Error("Unable to authenticate");
    } catch (err) {
      setLoggedState("unauthenticated");
    }
  }, []);

  useEffect(() => {
    // checkLoginState();
  }, []);
  useEffect(() => {
    console.log({ loggedState });
  }, [loggedState]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/auth" element={<AuthPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
