# "Kongen befaler" – resultat-grafikk

Sterkt inspirert av TV-programmet [Kongen Befaler](https://no.wikipedia.org/wiki/Kongen_befaler_(TV-program) frå [discovery+](https://www.discoveryplus.com/no/show/kongen-befaler) laga me konkurranse til familieunderhaldning på ein nyttårsfest. Denne appen blei brukt til å presentera poeng.


* Statisk tabell i kode med deltakarar, referanse til .png-filer for portrett, "steg" til å bla gjennom og poeng frå konkurransar som er innspelt på video på førehand.
 
* Bla gjennom stega med hurtigtastar N(ext) og P(revious) eller buttons i nedste venstre hjørne.

* Oppgåve 4 i repo-koden er "live", dvs at ein kan setja poeng manuelt. Hald inne tast 1–5 for å velja deltakar, og deretter +/- for å justera poengsum.


Bygd i full fart med Vite, SWC og React og litt for mange dependencies.
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

CSS for glow-effekt på poeng henta frå [w3schools.com](https://www.w3schools.com/howto/howto_css_glowing_text.asp)
