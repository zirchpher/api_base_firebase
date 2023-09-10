const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Importa el módulo cors
const admin = require("./firebaseConfig");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
// Configura CORS para permitir solicitudes desde todos los orígenes
app.use(cors());

// Rutas de la API
app.get("/api/data", (req, res) => {
  // Consulta Firestore y devuelve los datos
  admin.firestore().collection("alumnos").get()
    .then((snapshot) => {
      const data = [];
      snapshot.forEach((doc) => {
        data.push(doc.data());
      });
      res.json(data);
    })
    .catch((error) => {
      console.error("Error al consultar Firestore:", error);
      res.status(500).json({ error: "Error al consultar Firestore" });
    });
});

// Ruta para agregar datos a Firestore
app.post("/api/add-student", async (req, res) => {
  try {
    const { dni, nombre } = req.body;
    const code = "A002";

    // Valida los datos aquí si es necesario
    if (!dni || !nombre) {
      res.status(400).json({ error: "Name and email are required" });
      return;
    }

    // Agrega los datos a Firestore
    await admin.firestore().collection("alumnos").add({
      code: code,
      dni: dni,
      nombre: nombre,
    });

    res.status(201).json({ mensaje: "Datos agregados correctamente" });
  } catch (error) {
    console.error("Error al agregar datos a Firestore:", error);
    res.status(500).json({ error: "Error al agregar datos a Firestore" });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
