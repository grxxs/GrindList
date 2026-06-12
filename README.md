Instrukcja uruchomienia

Wymagane: Node.js, npm, konto MongoDB Atlas.

Sprawdzone lokalnie: Node.js v22.22.2, npm 10.9.7.
Glowne technologie: Express 5.2.1, Mongoose 9.6.2, React 19.2.6, Vite 8.0.12.

1. W folderze /server należy uruchomić następujące polecenia:

cd server
npm install
npm run dev

2. W folderze /client należy uruchomić następujące polecenia:

cd client
npm install
npm run dev

3. Plik .env zawiera kompletne i działające zmienne środowiskowe (w tym klucz RAWG API), są to:

PORT=5000
MONGO_URI=mongodb+srv://USER:PASSWORD@CLUSTER.mongodb.net/
MONGO_DB_NAME=GrindList
ACCESS_TOKEN_KEY=dlugi_losowy_sekret
RAWG_API_KEY=klucz_rawg
RAWG_URI=https://api.rawg.io/api/games
NODE_ENV=development

Nie należy ich zmieniać

4. W oknie przeglądarki należy wpisać poniższy adres:
   Frontend: `http://localhost:5173`

5. Aby przeprowadzić testy w zewnętrznym oprogramowaniu należy odnieść się do poniższego adresu:
   Adres API backendu: `http://localhost:5000`
