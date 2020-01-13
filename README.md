### Przygotowanie programów

- instalacja Visual Studio Code
- instalacja Node.js (zaznaczamy przy instalacji żeby używać Visual Studio Code)
- instalacja Git

### Przygotowanie edytora

- utworzenie folderu na projekt np. Arbuzy
- utworzenie programu `client` w folderze np. Arbuzy
  - `npx create-react-app client`
- utworzenie programu `api` w folderze np. Arbuzy
  - `npx create-react-app api`
- instalacja express
  - `npx express-generator api`
- instalacja w folderze `api` kolejno
  - `npm install`
  - `npm install mysql`
  - `npm install express-session`
  - `npm install express-mysql-session --save`
  - `npm install cors`
  - `npm install --global --production windows-build-tools` <- z uprawnieniami admina
  - `npm install --global node-gyp@latest` <- z uprawnieniami admina
  - `for /f "delims=" %P in ('npm prefix -g') do npm config set node_gyp "%P\node_modules\node-gyp\bin\node-gyp.js"` <- z uprawnieniami admina
  - `npm install bcrypt` <- z uprawnieniami admina
  - `npm install async`
- instalacja w folderze `client` kolejno
  - `npm install react-router-dom` <- z uprawnieniami admina
  - `npm install js-cookie --save`
  - `npm install react-responsive-carousel`
- usunięcie z obu projektów wszystkie pliki i foldery oprócz `node_modules`
- w folderze np. Arbuzy utworzyć git
  - `git init`
- dodajemy repozytorium
  - `git remote add origin https://github.com/OstrowskiBartosz/Arbuzy.git`
- sprawdzamy czy działa
  - `git remote -v`
- zaciągamy projekt
  - `git pull origin master`

### Uruchomienie strony

- stronę uruchamiamy odpalając w osobnych konsolach w folderach obu projektów
  - `npm start`

### Przygotowanie bazy

- Instalacja MariaDB z `https://mariadb.com/downloads/`
- Utworzenie bazy mozliwe z plików za pomocą poelcenia `source`
  - `source C:\Users\Haxxf\OneDrive\Dokumenty\Arbuzy\sql_szkielet`
  - `source C:\Users\Haxxf\OneDrive\Dokumenty\Arbuzy\sql_produkty`
  - `source C:\Users\Haxxf\OneDrive\Dokumenty\Arbuzy\sql_przyklad`
  - `source D:\Systemowe\Dokumenty\React\Arbuzy\sql_szkielet`
  - `source D:\Systemowe\Dokumenty\React\Arbuzy\sql_produkty`
  - `source D:\Systemowe\Dokumenty\React\Arbuzy\sql_przyklad`
- Aby wyłączyć bazę w celu podmiany plików wpisujemy w MySclClient
  - `SHUTDOWN;`
- Aby włączyć bazę wpisujemy w terminalu z uprawnieniami administratora -`net start mysql`

### Praca z projektem

- przed rozpoczęciem czegokolwiek zawsze dajemy
  - `git pull origin master`
- po każdej zmianie w source control dodajemy plusem pliki do wysłania, wpisujemy komentarz i commitujemy (ctrl+enter) lub alternatywnie w konsoli wpisujemy `git commit -m "Your comment"`
- następnie w konsoli wpisujemy
  - `git push origin master`

### Praca z gitem

- zapoznać się z linkiem
  - https://www.freecodecamp.org/forum/t/push-a-new-local-branch-to-a-remote-git-repository-and-track-it-too/13222?fbclid=IwAR2SQJ1WxQ-uF0Vq7OnNeEUvOX1Yrm5h2UpBfXWs0ALE94sfPBvPhZod4b0
- commity na osobnego brancha, gdy jest się pewnym, że nic się nie psuje to można zrobić merga z masterem
