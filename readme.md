## Question 1.1 donner la liste des en-têtes de la réponse HTTP du serveur.

* Connection : keep-alive
* Date : Thu, 17 Sep 2026 03:17:13 GMT (varie selon le moment de la requête)
* Keep-Alive : timeout=5
* Transfer-Encoding : chunked

À chaque requête externe, le serveur répondra ceci en premier.

## Question 1.2 donner la liste des en-têtes qui ont changé depuis la version précédente.

Ajout de :
* Content-Type: application/json  
* Content-Length: 20 (la taille a été recalculée pour le contenu JSON)

Suppression de :
* Transfer-Encoding : chunked

## Question 1.3 que contient la réponse reçue par le client ?

Elle ne contient rien, la page tourne dans le vide

## Question 1.4 quelle est l’erreur affichée dans la console ? Retrouver sur https://nodejs.org/api le code d’erreur affiché.

Voici l'erreur affichée :

Error: ENOENT: no such file or directory, open 'C:\Users\Onyx\Mon Drive (jaycollins917@gmail.com)\Université\Progs\Web 2\TP5\devweb-tp5\index.html'
    at async open (node:internal/fs/promises:633:25)
    at async Object.readFile (node:internal/fs/promises:1237:14) {
  errno: -4058,
  code: 'ENOENT',
  syscall: 'open',
  path: 'C:\\Users\\Onyx\\Mon Drive (jaycollins917@gmail.com)\\Université\\Progs\\Web 2\\TP5\\devweb-tp5\\index.html'


ENOENT (No such file or directory): Commonly raised by fs operations to indicate that a component of the specified pathname does not exist. No entity (file or directory) could be found by the given path.

En clair, cette erreur est communément levée par les opérations filesystem dont le composant ou le chemin n'existe pas.

## Question 1.5 donner le code de requestListener() modifié avec gestion d’erreur en async/await.

```js
import fs from "node:fs/promises";

async function requestListener(_request, response) {

  try {
    const contents = await fs.readFile("index.html", "utf8");
    response.setHeader("Content-Type", "text/html");
    response.writeHead(200);
    return response.end(contents);
  } 

  catch (error) {
    console.error(error);
    response.writeHead(500, { "Content-Type": "text/html" });
    return response.end("<html><h1>Erreur interne - fichier non trouve</h1></html>");
  }
}
```



