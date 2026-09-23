## Question 1.1 - Donner la liste des en-têtes de la réponse HTTP du serveur.

* Connection : keep-alive
* Date : Thu, 17 Sep 2026 03:17:13 GMT (varie selon le moment de la requête)
* Keep-Alive : timeout=5
* Transfer-Encoding : chunked

À chaque requête externe, le serveur répondra ceci en premier.

## Question 1.2 - Donner la liste des en-têtes qui ont changé depuis la version précédente.

Ajout de :
* Content-Type: application/json  
* Content-Length: 20 (la taille a été recalculée pour le contenu JSON)

Suppression de :
* Transfer-Encoding : chunked

## Question 1.3 - Que contient la réponse reçue par le client ?

Elle ne contient rien, la page tourne dans le vide

## Question 1.4 - Quelle est l’erreur affichée dans la console ? Retrouver sur https://nodejs.org/api le code d’erreur affiché.

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

## Question 1.5 - Donner le code de requestListener() modifié avec gestion d’erreur en async/await.

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

## Question 1.6 - Indiquer ce que cette commande a modifié dans votre projet.

Dans node_modules
* Ajout du module cross-env
* Ajout du module nodemon

Dans les fichiers
* Ajout du fichier package-lock.json avec l'indicateur U à droite
* Modification du fichier package.json et ajout indicateur M

Cela sert à dire qui faudra faire un commit dans Git

## Question 1.7 - Quelles sont les différences entre les scripts http-dev et http-prod ?

Dans le fichier package.json :
    "http-dev": "cross-env NODE_ENV=development nodemon server-http.mjs",
    "http-prod": "cross-env NODE_ENV=production node server-http.mjs"

Pour lancer le serveur, on peut choisir soit le module nodemon, soit le module nodemon.

## node VS nodemon

**node** est l'exécuteur officiel de javascript
* Comportement statique: à chaque modif de code, le serveur ne se relance pas
* Utilisé pour la production

**nodemon** est un wrapper, un outil de développement qui englobe node
* Comportement dynamique: il relance le serveur à chaque modif de code
* Utilisé en mode développement, localement sur le pc.


* npm run http-dev

**Environnement en mode développement:**

Surveille si on a fait des modifs dans le script server-http.mjs et relance à chaque modifs

Si on ajoute cette ligne :
console.log("NODE_ENV =", process.env.NODE_ENV);   // Affiche NODE_ENV = development
=> le serveur est redémarré et le nouveau message est affiché dans le terminal

* npm run http-prod

**Environnement en mode production (ie client):**

console.log("NODE_ENV =", process.env.NODE_ENV);   // Affiche NODE_ENV = production
Mais si on fait une modif, le serveur n'est pas relancé

## Question 1.8 donner les codes HTTP reçus par votre navigateur pour chacune des quatre pages précédentes.

http://localhost:8000/index.html
Hello Again!
This is served from a file

http://localhost:8000/random.html
93

http://localhost:8000/
404: NOT FOUND

http://localhost:8000/dont-exist
404: NOT FOUND

Le switch/case du .mjs dit ce qu'il faut faire si on accède à ces différentes adresses.

## Question 2.1 - Donner les URL des documentations de chacun des modules installés par la commande précédente.

express : https://expressjs.com/
http-errors : https://www.npmjs.com/package/http-errors
loglevel : https://www.npmjs.com/package/loglevel
morgan : https://expressjs.com/en/resources/middleware/morgan.html (ou sur npm : https://www.npmjs.com/package/morgan)


## Question 2.2 - Vérifier que les trois routes fonctionnent.

npm run express-dev

http://localhost:8000/              // Affichage page "Hello Again"
http://localhost:8000/index.html    // Affichage page "Hello Again"
http://localhost:8000/random/5      // Affiche 5 nombres au hasard


## Question 2.3 - Lister les en-têtes des réponses fournies par Express. Lesquelles sont nouvelles par rapport au serveur HTTP ?

*En-têtes de réponses en HTTP:*
connection          keep-alive
content-type        text/html
date                Wed, 23 Sep 2026 21:50:13 GMT
keep-alive          timeout=5
transfer-encoding   chunked

*En-têtes de réponses en EXPRESS:*
connection          keep-alive
content-length      81
content-type        text/html; charset=utf-8
date                Wed, 23 Sep 2026 21:48:39 GMT
etag                W/"51-lvCDTV2O/HDg2tJhx6Lyx7CM5tU"
keep-alive          timeout=5
x-powered-by        Express

Les nouvelles en-têtes sont:
x-powered-by        Express                                   // Pour notifier que le framework Express est utilisé
etag                W/"51-lvCDTV2O/HDg2tJhx6Lyx7CM5tU"        // C'est le code pour récupérer la page en cache
content-length      81                                        // Taille exacte de la réponse avant de l'envoyer (alors qu'en HTTP c'était en envoyé par morceaux *chunked*)

## Question 2.4 - Quand l’événement listening est-il déclenché ?

L'évènement listening est déclenché quand le port est prêt à écouter à l'adresse localhost/8000.
Ouvrir un un port sur un hôte (app.listen(port, host)) n'est pas immédiat, et mettre un écouteur sur cette fonction permet de vérifier que le port est en écoute avant de recevoir de possibles données.

## Question 2.5 - Indiquer quelle est l’option (activée par défaut) qui redirige / vers /index.html ?

L'option par défaut de *app.use(express.static("static"))* est index.html, et pointe directement ce fichier du répertoir static.
Quand le navigateur du client demandera le fichier css associé, pas besoin de créer de route, car le navigateur n'a pas le droit de lire le disque dur du serveur.



## Question 2.6 - Visiter la page d’accueil puis rafraichir (Ctrl+R) et ensuite forcer le rafraichissement (Ctrl+Shift+R). Quels sont les codes HTTP sur le fichier style.css ? Justifier.

Pour un rafraîchissement simple, on a le code 304 en réponse: les données viennent du cache.
Quand on force un rafraîchissement, on a le code 200 car le navigateur force le serveur à renvoyer le fichier CSS même s'il n'a pas été modifié.

En mode http tel qu'utilisé dans ce TP, la fonction cache n'est pas utilisée.
En mode express, avec le middleware express.static, la fonction cache est intégrée et active, ce qui fait qu'on obtient le code 304 en mode express, et non en mode http.











## Question 2.7



# Un joli titre
## Un autre titre sympa
### Titre 3
#### Titre 4
##### Titre 5

* Un paragraphe
*En italique*
**En gras**
## Du code
```js
typeof 42
typeof 42.15        //renvoient tous les deux "number"
```