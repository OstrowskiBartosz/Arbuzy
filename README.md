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
- usunięcie z obu projektów folderów: `public`, `src` i plików: `package-lock.json`, `package.json`
- w folderze np. Arbuzy utworzyć git
    - `git init`
- dodajemy repozytorium
    - `git remote add origin https://github.com/OstrowskiBartosz/Arbuzy.git`
- sprawdzamy czy działa
    - `git remote -v`
- zaciągamy projekt
    - `git pull origin master`
- w api tworzymy folder `bin` i wklejamy tom plik `www`, który musimy sobie od kogoś załatwić

### Uruchomienie strony
- stronę uruchamiamy odpalając w osobnych konsolach w folderach obu projektów
    - `npm start`

### Przygotowanie bazy
- Instalacja MariaDB z `https://mariadb.com/downloads/`

### Praca z projektem
- przed rozpoczęciem czegokolwiek zawsze dajemy
    - `git pull origin master`
- po każdej zmianie w source control dodajemy plusem pliki do wysłania, wpisujemy komentarz i commitujemy (ctrl+enter)
- następnie w konsoli wpisujemy
    - `git push origin master`