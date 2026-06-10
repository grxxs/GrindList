import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function Register() {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedLogin = login.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)/;

    if (!trimmedLogin) {
      setErrorMessage("Login jest wymagany");
      return;
    }

    if (trimmedLogin.length < 5 || trimmedLogin.length > 30) {
      setErrorMessage("Login musi mieć od 5 do 30 znaków");
      return;
    }

    if (!trimmedEmail) {
      setErrorMessage("Email jest wymagany");
      return;
    }

    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage("Niepoprawny adres email");
      return;
    }

    if (!password) {
      setErrorMessage("Hasło jest wymagane");
      return;
    }

    if (password.length < 9) {
      setErrorMessage("Hasło musi mieć minimum 9 znaków");
      return;
    }

    if (!passwordRegex.test(password)) {
      setErrorMessage("Hasło musi zawierać dużą literę i cyfrę");
      return;
    }

    try {
      setErrorMessage("");

      const data = await register(trimmedLogin, trimmedEmail, password);
      navigate("/login", {
        state: {
          message: data.message || "Konto utworzone. Możesz się zalogować.",
        },
      });
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="form-page">
      <h1>Rejestracja</h1>

      {errorMessage && <p className="message error">{errorMessage}</p>}

      <form className="form-card" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Login"
          value={login}
          onChange={(event) => setLogin(event.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button type="submit">Zarejestruj</button>
      </form>
    </div>
  );
}

export default Register;
