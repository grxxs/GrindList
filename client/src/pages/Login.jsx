import { useState } from "react";

function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ login, password }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log(`Zalogowano: ${data.message}`);
    } else {
      console.log(`Błąd: ${data.message}`);
    }
  };

  return (
    <div>
      <h1>Logowanie</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Login"
          value={login}
          onChange={(event) => setLogin(event.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
        <button type="submit">Zaloguj</button>
      </form>
    </div>
  );
}

export default Login;
