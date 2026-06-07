import { useState } from "react";

function Register() {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log(`Zarejestrowano: ${data.message}`);
    } else {
      console.log(`Błąd: ${data.message}`);
    }
  };

  return (
    <div>
      <h1>Rejestracja</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Login"
          value={login}
          onChange={(event) => setLogin(event.target.value)}
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
        <button type="submit">Zarejestruj</button>
      </form>
    </div>
  );
}

export default Register;
