import express from "express";
import morgan from "morgan";

const host = "localhost";
const port = 8000;

const app = express();

if (app.get("env") === "development") {
  app.use(morgan("dev"));
}

app.set("view engine", "ejs");        // Gestion des templates comme Jinja en Python

app.use(express.static("static"));

/* Avant l'utilisation de express.static
app.get(["/", "/index.html"], async function (request, response, next) {
  response.sendFile("index.html", { root: "./" });
});         */

/* avant ajout fonction templating EJS
app.get("/random/:nb", async function (request, response, next) {
  const length = request.params.nb;
  const contents = Array.from({ length })
    .map((_) => `<li>${Math.floor(100 * Math.random())}</li>`)
    .join("\n");
  return response.send(`<html><ul>${contents}</ul></html>`);
});   */

// Templating EJS
app.get("/random/:nb", async function (request, response, next) {
  const length = Number.parseInt(request.params.nb, 10);

  const numbers = Array.from({ length }).map(() =>                // Génération du tableau de nombres aléatoires
    Math.floor(100 * Math.random())
  );

   const welcome = `Voici tes ${length} nombres aléatoires :`;    // Chaîne de caractères transmise à la vue
  
  return response.render("random", { numbers, welcome });         // Appel du moteur de rendu EJS (il ira chercher views/random.ejs)
});

// app.listen(port, host); Ligne remplacée par celles ci-dessous
const server = app.listen(port, host);

server.on("listening", () =>
  console.info(
    `HTTP listening on http://${server.address().address}:${server.address().port} with mode '${process.env.NODE_ENV}'`,
  ),
);

console.info(`File ${import.meta.url} executed.`);