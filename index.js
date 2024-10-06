const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require('dotenv').config()

const app = express();
app.use(cors());
app.use(express.json());

let usuarios = [];


const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');
  
  if (!token) {
    return res.status(403).json({ error: 'se denego el acceso por que no es un token valido' });
  }


  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'El token es invalido o ya se expiro' });
    }
    req.user = user;
    next();
  });
};


app.get("/", (req, res) => {
  res.status(200).send("Bienvenido a la API de gestión de usuarios.");
});


app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = usuarios.find((u) => u.email === email && u.password === password);
  
  if (!user) {
    return res.status(401).json({ error: "Credenciales incorrectas" });
  }


  const token = jwt.sign({ userId: user.dpi }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
  res.json({ token });
});


app.get("/users", authenticateJWT, (req, res) => {
  res.status(200).json(usuarios);
});


app.post("/users", (req, res) => {
  const { dpi, name, email, password } = req.body;
  const usuarioExistente = usuarios.find((user) => user.dpi === dpi);
  
  if (usuarioExistente) {
    return res.status(400).json({ error: "El registro del DPI ya está en uso" });
  }
  
  const nuevoUsuario = { dpi, name, email, password };
  usuarios.push(nuevoUsuario);
  res.status(201).json(nuevoUsuario);
});


app.put("/users/:dpi", authenticateJWT, (req, res) => {
  const { dpi } = req.params;
  const { name, email, password, newDpi } = req.body;
  
  const usuarioIndex = usuarios.findIndex((user) => user.dpi === dpi);
  
  if (usuarioIndex === -1) {
    return res.status(404).json({ error: "No se encontró el usuario, intente de nuevo" });
  }
  
  if (newDpi && usuarios.some((user) => user.dpi === newDpi)) {
    return res.status(400).json({ error: "El registro del DPI ya está en uso" });
  }

  usuarios[usuarioIndex] = { ...usuarios[usuarioIndex], name, email, password, dpi: newDpi || dpi };
  res.status(200).json(usuarios[usuarioIndex]);
});


app.delete("/users/:dpi", authenticateJWT, (req, res) => {
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
