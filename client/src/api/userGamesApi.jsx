const API_URL = "http://localhost:5000";

export const getUserGames = async () => {
  const response = await fetch(`${API_URL}/user-games`, {
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Błąd pobierania biblioteki");
  }

  return data.gameList || [];
};

export const addUserGame = async (game) => {
  const response = await fetch(`${API_URL}/user-games`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(game),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Błąd dodawania gry");
  }

  return data;
};

export const updateUserGameStatus = async (userGameId, status) => {
  const response = await fetch(`${API_URL}/user-games/${userGameId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ status }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Błąd zmiany statusu");
  }

  return data;
};

export const deleteUserGame = async (userGameId) => {
  const response = await fetch(`${API_URL}/user-games/${userGameId}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Błąd usuwania gry");
  }

  return data;
};
