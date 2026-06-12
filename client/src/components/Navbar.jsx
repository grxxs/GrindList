import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function Navbar() {
  const { user, isAuthLoading, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link className="navbar-logo" to="/">
          <img src="/Logo.png" alt="Logo GrindList" />
          <span className="brand-text">
            Grind<span className="brand-gradient">List</span>
          </span>
        </Link>

        <div className="navbar-center">
          <NavLink to="/">Strona główna</NavLink>
          <NavLink to="/library">Biblioteka</NavLink>
        </div>

        <div className="navbar-auth">
          {isAuthLoading && <span className="navbar-muted">Sprawdzanie...</span>}

          {!isAuthLoading && !user && (
            <>
              <Link to="/login">Logowanie</Link>
              <Link className="auth-button" to="/register">
                Rejestracja
              </Link>
            </>
          )}

          {!isAuthLoading && user && (
            <>
              <span className="user-pill">Zalogowany: {user.login}</span>
              <button type="button" className="link-button" onClick={handleLogout}>
                Wyloguj
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
