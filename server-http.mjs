import http from "node:http";
import fs from "node:fs/promises";

const host = "localhost";
const port = 8000;            // http://localhost:8000/


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



const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});