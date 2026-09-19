import http from "node:http";
import fs from "node:fs/promises";

const host = "localhost";
const port = 8000; // http://localhost:8000/

/* requestListener n°1
function requestListener(_request, response) {
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify({ message: "I'm OK" }));
}
*/

/* requestListener n°2
  function requestListener(_request, response) {
    response.writeHead(200);
    response.end("<html><h1>My first server!<h1></html>");
  }
*/

// requestListener n°3  - Promesses basées sur le chaînage .then()  .catch()
/*
import fs from "node:fs/promises";

function requestListener(_request, response) {

  fs.readFile("index.html", "utf8")                     // Va ouvrir un fichier

    .then((contents) => {

      response.setHeader("Content-Type", "text/html");
      response.writeHead(200);
      return response.end(contents);
    })

    .catch((error) => {

      console.log(error);
      response.writeHead(500);        
      response.end("<html><h1>Erreur interne - fichier non trouve<h1></html>");
    })
}
*/

// requestListener n°4 en mode async / await
/*
async function requestListener(_request, response) {
  try {
    const contents = await fs.readFile("index.html", "utf8");
    response.setHeader("Content-Type", "text/html");
    response.writeHead(200);
    return response.end(contents);
  } catch (error) {
    console.error(error);
    response.writeHead(500, { "Content-Type": "text/html" });
    return response.end(
      "<html><h1>Erreur interne - fichier non trouve</h1></html>",
    );
  }
}
*/

// requestListener n°5 - Gestion manuelle des routes
async function requestListener(request, response) {
  response.setHeader("Content-Type", "text/html");
  try {
    const contents = await fs.readFile("index.html", "utf8");

    // Traitement pour la route /random/:nb
    if (request.url.startsWith("/random/")) {         // Si l'adresse commence par random
      const parts = request.url.split("/");           // Découpe l'url pour extraire le nombre entré
      const count = parseInt(parts[2], 10);           // Et le convertit en entier

      // Si le paramètre n'est pas un nombre valide
      if (isNaN(count) || count < 1) {
        response.writeHead(400);
        return response.end(`<html><p>400: BAD REQUEST - Nombre invalide</p></html>`);
      }

      // Génération de la liste des nombres
      const numbers = Array.from({ length: count }, () =>
        Math.floor(100 * Math.random())
      );
      const htmlList = numbers.map((n) => `<li>${n}</li>`).join("");

      response.writeHead(200);
      return response.end(`<html><ul>${htmlList}</ul></html>`);
    }



    switch (request.url) {
      case "/index.html":
        response.writeHead(200);
        return response.end(contents);
      case "/random.html":
        response.writeHead(200);
        return response.end(`<html><p>${Math.floor(100 * Math.random())}</p></html>`);
      default:
        response.writeHead(404);
        return response.end(`<html><p>404: NOT FOUND</p></html>`);
    }
  } catch (error) {
    console.error(error);
    response.writeHead(500);
    return response.end(`<html><p>500: INTERNAL SERVER ERROR</p></html>`);
  }
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

console.log("NODE_ENV =", process.env.NODE_ENV);
console.log("ici");
console.log("hello");

