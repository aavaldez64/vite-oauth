const serverUrl = import.meta.env.VITE_SERVER_URI;

export function LoginPage() {
  const handleLogin = async () => {
    try {
      // Gets authentication url from backend server
      const request = await fetch(`${serverUrl}/auth/oauth-url`);
      const data = await request.json();
      console.log(data);
      // Navigate to consent screen
      if (data.url) window.location.assign(data.url);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button type="button" onClick={handleLogin}>
        Login With Discord
      </button>
    </div>
  );
}
