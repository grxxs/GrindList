import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(
    location.state?.message || "",
  );
  const { login: loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedLogin = login.trim();

    if (!trimmedLogin) {
      setErrorMessage("Nazwa użytkownika jest wymagana");
      setSuccessMessage("");
      return;
    }

    if (!password) {
      setErrorMessage("Hasło jest wymagane");
      setSuccessMessage("");
      return;
    }

    try {
      setErrorMessage("");
      setSuccessMessage("");

      await loginUser(trimmedLogin, password);
      navigate("/library");
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="form-page">
      <h1>Logowanie</h1>

      {errorMessage && <p className="message error">{errorMessage}</p>}
      {successMessage && <p className="message success">{successMessage}</p>}

      <form className="form-card" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nazwa użytkownika"
          value={login}
          onChange={(event) => setLogin(event.target.value)}
        />

        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button type="submit">Zaloguj</button>
      </form>
    </div>
  );
}

export default Login;
