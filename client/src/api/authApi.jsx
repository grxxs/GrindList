const API_URL = "http://localhost:5000";

export const loginUser = async (login, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ login, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Błąd logowania");
  }

  return data;
};

export const registerUser = async (login, email, password) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ login, email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Błąd rejestracji");
  }

  return data;
};

export const logoutUser = async () => {
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Błąd wylogowania");
  }

  return data;
};

export const getLoggedUser = async () => {
  const response = await fetch(`${API_URL}/auth/me`, {
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Nie jesteś zalogowany");
  }

  return data;
};
