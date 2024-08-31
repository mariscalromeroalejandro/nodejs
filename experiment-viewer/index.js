const express = require("express");
const app = express();
const port = 3000;

const experimentRoutes = require("./routes/experimentRoutes");
const sequelize = require("./config/database");

const Experiment = require("./models/Experiment");

//Parsear json
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

//Rutas
app.use("/api", experimentRoutes);

//Ruta raíz
app.get("/", (req, res) => {
  res.send("Visualizador de Experimentos de Colisión");
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión con la bbdd establecida");
  })
  .catch((err) => {
    console.error("No se pudo conectar con la bbdd", err);
  });

sequelize
  .sync()
  .then(() => {
    console.log("BBDD sincronizada");
  })
  .catch((err) => {
    console.error("Error al sync bbdd", err);
  });

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
