# Pubblicare la dashboard su GitHub Pages

## La dashboard è online

**https://ilcap9989.github.io/cheto/**

Repository: [github.com/ilcap9989/cheto](https://github.com/ilcap9989/cheto) · pubblicato il 2 agosto 2026.

Aprilo sul telefono e aggiungilo alla schermata Home: si comporta come un'app.

---

## Aggiornare la pagina

Il modo più semplice, senza Terminale: su GitHub apri il file da modificare, premi la matita, incolla il contenuto nuovo e premi *Commit changes*. La pagina si aggiorna entro un paio di minuti.

In alternativa, se colleghi il repository locale (istruzioni sotto), basta `./deploy.sh`.

---

## Collegare il repository locale (facoltativo)

### 1. Crea il repository su GitHub

Vai su [github.com/new](https://github.com/new):

- **Repository name:** `cheto` (o quello che preferisci)
- **Visibilità:** Public — necessaria per avere GitHub Pages gratis
- **Non** aggiungere README, .gitignore o licenza: il repository locale esiste già

Premi *Create repository*.

### 2. Collega il repository locale e carica

Nel Terminale, sostituendo `TUO-USERNAME` con il tuo nome utente GitHub:

```bash
cd ~/Documents/Claude/Projects/Cheto
rm -f .git/HEAD.lock .git/index.lock
git branch -M main
git remote add origin https://github.com/TUO-USERNAME/cheto.git
git push -u origin main
```

Al primo push GitHub chiede le credenziali: usa il tuo username e un **personal access token** al posto della password (si crea in *Settings → Developer settings → Personal access tokens → Tokens (classic)*, con il permesso `repo`).

### 3. Attiva GitHub Pages

Nel repository su GitHub: **Settings → Pages**

- *Source:* Deploy from a branch
- *Branch:* `main`, cartella `/ (root)`
- Salva

Dopo un paio di minuti la pagina è online a:

```
https://TUO-USERNAME.github.io/cheto/
```

Aprilo sul telefono e aggiungilo alla schermata Home: si comporta come un'app.

---

## Ogni volta che il piano cambia

```bash
cd ~/Documents/Claude/Projects/Cheto
./deploy.sh "Aggiornato piano dopo check-in del 5 agosto"
```

La prima volta rendi lo script eseguibile:

```bash
chmod +x deploy.sh
```

---

## Sull'indicizzazione

La pagina contiene `<meta name="robots" content="noindex, nofollow">` e il repository include un `robots.txt` che blocca tutti i crawler. Google e gli altri motori non la indicizzano.

**Da sapere però:** con un repository pubblico il contenuto dei file resta leggibile su `github.com/TUO-USERNAME/cheto`, e le pagine di GitHub sono indicizzate. Chi cerca il tuo nome utente può quindi trovare il codice, anche se non trova la pagina pubblicata.

Se un giorno volessi chiudere anche quello, le strade sono due: repository privato con GitHub Pro (Pages su repo privati richiede il piano a pagamento), oppure spostare la pagina su Netlify o Cloudflare Pages, dove i sorgenti non sono pubblici.

---

## Come funziona l'aggiornamento dei dati

La pagina è **statica**: non può scrivere su GitHub da sola. Il flusso è questo:

1. Mi dai il check-in in chat, da qualsiasi dispositivo
2. Io aggiorno il file e faccio il commit
3. Tu lanci `./deploy.sh` (oppure lo lancio io quando lavoriamo insieme)
4. La pagina online si aggiorna

Il modulo di check-in dentro la pagina salva invece nel browser del dispositivo che stai usando: serve per gli appunti veloci quando non ci sono. I pulsanti **Esporta** e **Importa** travasano lo storico da un dispositivo all'altro copiando una riga di testo.
