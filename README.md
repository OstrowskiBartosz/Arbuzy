### Przygotowanie programów
- instalacja Visual Studio Code
- Instalacja Node.js (zaznaczamy przy instalacji żeby używać Visual Studio Code)
- Instalacja Git

### Przygotowanie edytora
- utworzenie folderu na projekt np. Arbuzy
- utworzenie programu `client` w folderze np. Arbuzy
    - `npx create-react-app client`
- utworzenie programu `api` w folderze np. Arbuzy
    - `npx create-react-app api`
- usunięcie z obu projektów folderów: `public`, `src` i plików: `package-lock.json`, `package.json`
- w folderze np. Arbuzy utworzyć git
    - `git init`
- dodajemy repozytorium
    - `git remote add origin https://github.com/OstrowskiBartosz/Arbuzy.git`
- sprawdzamy czy działa
    - `git remote -v`
- zaciągamy projekt
    - `git pull origin master`

### Praca z projektem
- przed rozpoczęciem czegokolwiek zawsze dajemy
    - `git pull origin master`
- po każdej zmianie w source control dodajemy plusem pliki do wysłania, wpisujemy komentarz i commitujemy (ctrl+enter)
- następnie w konsoli wpisujemy
    - `git push origin master`