const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
let usuarios = [];
app.get("/", (req, res) => {
  res.status(200).send("Bienvenido a la API de gestión de usuarios.");
});
app.get("/users", (req, res) => {
  res.status(200).json(usuarios);
});
app.post("/users", (req, res) => {
  const { dpi, name, email, password } = req.body;
  const usuarioExistente = usuarios.find((user) => user.dpi === dpi);
  if (usuarioExistente) {
    return res.status(400).json({ error: "El registro del DPI ya esta en uso" });
  }
  const nuevoUsuario = { dpi, name, email, password };
  usuarios.push(nuevoUsuario);
  res.status(201).json(nuevoUsuario);
});
app.put("/users/:dpi", (req, res) => {
  const { dpi } = req.params;
  const { name, email, password, newDpi } = req.body;
  const usuarioIndex = usuarios.findIndex((user) => user.dpi === dpi);
  if (usuarioIndex === -1) {
    return res.status(404).json({ error: "No se encontro el usuario intente de nuevo" });
  }
  if (newDpi && usuarios.some((user) => user.dpi === newDpi)) {
    return res.status(400).json({ error: "el registro del DPI ya esta en uso" });
  } 
  usuarios[usuarioIndex] = { ...usuarios[usuarioIndex], name, email, password, dpi: newDpi || dpi };
  res.status(200).json(usuarios[usuarioIndex]);
});
app.delete("/users/:dpi", (req, res) => {
  const { dpi } = req.params;
  const usuarioIndex = usuarios.findIndex((user) => user.dpi === dpi);
  if (usuarioIndex === -1) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }
  const usuarioEliminado = usuarios.splice(usuarioIndex, 1);
  res.status(200).json(usuarioEliminado);
});
app.listen(3000, () => {
  console.log("Servidor corriendo en el puerto 3000");
});
