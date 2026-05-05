# Site Catedra ITI - React multi-page (fără build)

Template React modern pentru proiectul de an, cu meniu pe pagini diferite și structură ușor de mutat în WordPress.

## Upgrade-uri performanță și funcții avansate

- React runtime optimizat fără compilare Babel în browser
- scripturi `defer` + `preconnect` pentru încărcare mai rapidă
- Dark/Light mode cu salvare în `localStorage`
- căutare + filtrare pe pagina Profesori
- pagină individuală pentru fiecare profesor (`profesor.html?id=pX`)
- tab-uri și filtrare categorie pe pagina Media
- lightbox interactiv pentru galerie foto
- pagină dedicată de Noutăți (`noutati.html`) cu filtru + căutare
- anunț evidențiat cu rotație automată pe Home
- formular demo cu validare locală pe Contact
- buton flotant „Sus” + notificări toast
- cache offline pentru versiunea statică prin `service-worker.js`
- SEO basic: meta Open Graph/Twitter + `robots.txt` + `sitemap.xml`

## Structura principală

- `index.html` - Acasă
- `despre.html` - Despre Catedră
- `profesori.html` - Profesori
- `profesor.html` - Profil Profesor (detalii individuale)
- `studenti.html` - Studenți
- `media.html` - Video + Galerie Foto
- `noutati.html` - Noutăți și anunțuri
- `contact.html` - Contact
- `app.js` - layout comun + conținut React pentru toate paginile
- `styles.css` - stiluri globale moderne
- `service-worker.js` - cache static pentru navigare mai rapidă
- `robots.txt` - reguli pentru crawleri
- `sitemap.xml` - sitemap SEO (înlocuiești domeniul cu domeniul real)

Toate informațiile sunt placeholder și pot fi înlocuite rapid cu date reale.

## Rulare locală

Nu deschide direct fișierul HTML din Explorer; rulează prin server local.

1. În terminal, din folderul proiectului:
   `py -m http.server 5500`
2. Deschide în browser:
   `http://127.0.0.1:5500`

Prima încărcare este online; după aceea, resursele locale pot fi servite mai rapid din cache.

Alternative:

- dublu click pe `start-site.bat`
- PowerShell: `./start-site.ps1`

## Rulare cu Start Debugging (F5)

Configurațiile există deja în `.vscode/launch.json` și `.vscode/tasks.json`.

1. `Ctrl+Shift+D`
2. Selectezi:
   - `Run Site (Edge + Python server)`
   - sau `Run Site (Chrome + Python server)`
3. Apeși `F5`

VS Code pornește serverul și browserul automat, iar la stop debug oprește serverul.

## WordPress (transport rapid)

1. Copiezi proiectul în tema activă, de exemplu:
   `wp-content/themes/nume-tema/it-catedra/`
2. Copiezi `wordpress/template-it-catedra.php` în tema activă.
3. Creezi o pagină WordPress și alegi template-ul `Catedra ITI (React)`.
4. Navigarea între secțiuni se face prin query (`?view=home`, `?view=profesori`, etc.), deja configurat în template.
5. Sunt incluse și view-uri noi pentru WordPress: `?view=noutati` și `?view=profesor&id=p1`.

Notă: în WordPress, service worker-ul este dezactivat implicit în template pentru compatibilitate.

## Unde editezi conținutul

- date generale + pagini: `app.js`
- aspect vizual: `styles.css`
- metadata pe pagini (titlu/descriere): fișierele HTML

## Notă SEO

- În `sitemap.xml` și `robots.txt` există domeniu placeholder (`https://catedra-it.example.com`).
- Înlocuiește-l cu domeniul real înainte de publicare.


