const express = require("express");
const app = express();
const db = require("./database");

app.use(express.static("public"));
app.use(express.json());

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.post("/login", function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  var sqlTalento = `SELECT *, NULL AS contrasena FROM talento WHERE correo = '${email}' AND contrasena = '${password}';`;
  var sqlCazador = `SELECT *, NULL AS contrasena FROM cazador WHERE correo = '${email}' AND contrasena = '${password}';`;
  db.query(sqlTalento, function (err, data) {
    if (err) throw err;
    valueTalento = JSON.stringify(data);
    // If talento does not exists, look for cazador
    if (valueTalento === "[]") {
      db.query(sqlCazador, function (errCazador, dataCazador) {
        if (errCazador) throw err;
        valueCazador = JSON.stringify(dataCazador);
        res.send(valueCazador);
      });
    } else {
      res.send(valueTalento);
    }
  });
});

app.listen(3000, function () {
  console.log("Servidor funcionando wii");
});
