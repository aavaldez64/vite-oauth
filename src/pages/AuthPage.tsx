import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const serverUrl = import.meta.env.VITE_SERVER_URI;

export function AuthPage() {
  const navigate = useNavigate();

  const getUserToken = useCallback(async (code: string) => {
    try {
      if (!code) throw new Error("Missing code");
      const request = await fetch(`${serverUrl}/auth/oauth-token?code=${code}`);
      if (!request.ok) throw new Error("Unable to authenticate");
      if (request.status === 304) return;
      const { user, token } = await request.json();
      console.log(user, token);
      // TODO: Guardar token en store para enviar en peticiones como un Bearer Token
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.log(error);
      navigate("/", { replace: true });
    }
  }, []);
  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const authCode = searchParams.get("code");
      console.log(authCode);
      getUserToken(authCode || "");
    } catch (error) {
      console.log("Unauthenticated. Must be redirected to unauth zone.");
      console.log(error);
    }
  }, []);

  return <div>AuthPage</div>;
}
