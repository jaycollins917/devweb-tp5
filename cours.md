# NODE.JS

Node.js est un environnement d'exécution (un runtime) qui permet d'exécuter du code JavaScript hors du navigateur web, principalement côté serveur (backend).

* Moteur V8 : Node.js utilise le moteur JavaScript V8 de Google Chrome pour exécuter le code directement sur la machine (processeur, mémoire, système de fichiers).

* Côté Serveur (Backend) : Contrairement au JavaScript traditionnel qui tourne dans le navigateur pour gérer le DOM et l'interface utilisateur, Node.js permet de créer des applications serveur HTTP, des API REST, d'accéder aux bases de données ou de manipuler des fichiers locaux.  

* Modèle Asynchrone & Non-Bloquant : Node.js fonctionne avec une boucle d'événements (Event Loop) à un seul fil d'exécution (single-thread), ce qui le rend très efficace pour gérer un grand nombre de connexions simultanées sans bloquer le serveur.


* Écosystème NPM : Il vient avec npm (Node Package Manager), un gestionnaire de paquets qui permet d'installer des bibliothèques externes (comme Express pour créer des serveurs, Nodemon, EJS, etc.).  

## Ma version de Node.js

C:\Users\Onyx>node -v
v22.16.0

## inclu: npm
npm -v 10.9.2

## Initialiser / Démarrer/ Arrêter le serveur

Dans un terminal:

npm init					// Initialiser un nouveau projet

Note
* si le projet est en cjs, les fichiers seront en .js
* si le projet est en ecmasript, fichiers.mjs

node server-http.mjs		// Lancer le serveur avec le fichier mjs

// ensuite, on peut accéder à http://localhost:8000/

taskkill /F /IM node.exe



## Interrogation du serveur

curl -I http://localhost:8000

NPM 		node package manager	récupérer des packages
installer node
si on aime bien 
nvm 	node virtual manager 	gère plusieurs versions de nodes
Docker


## Fichier mjs

Un fichier avec l'extension .mjs désigne un fichier JavaScript utilisant la syntaxe officielle ECMAScript Modules (ES Modules) dans l'environnement Node.js.

Le **m** signifie Module. L'extension permet à Node.js de savoir exactement comment interpréter le code sans avoir besoin de configuration supplémentaire dans le fichier package.json.

* Extension .mjs (ES Modules) : Utilise la syntaxe moderne avec import et export (ex: import http from "node:http";).

* Extension .js classique (CommonJS par défaut) : Utilise historiquement la syntaxe require() et module.exports (ex: const http = require("node:http");).V


```js
npm init
# question interactives
npm install slugify					// ça permet de locker des versions de projet
# added 1 package in 2s

cat main.js
# import slugify from "slugify"
# console.log(slugify("C'est un test ♥ !"));

node main.js
# C'est-un-test-love-!

Avec npx on peut directement executer des fonctions, sans installer des package

typescript  javascript version typée, pour imposer des règles

node vs bun vs deno => tester avec bun ou deno le tp6










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