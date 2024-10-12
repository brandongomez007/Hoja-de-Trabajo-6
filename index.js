const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

let usuarios = [];

// codigo para verificar los token
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');
  
  if (!token) {
    return res.status(403).json({ error: 'no hay token' });
  }


  jwt.verify(token, process.env.contrasenaa, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Ya expiro el token o es invalido intentar de nuevo' });
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
    return res.status(401).json({ error: "contraseña incorrecta" });
  }


  const token = jwt.sign({ userId: user.dpi }, process.env.contrasenaa, { expiresIn: process.env.teimpoo });
  res.json({ token });
});


app.get("/users", authenticateJWT, (req, res) => {
  res.status(200).json(usuarios);
});


app.post("/users", (req, res) => {
  const { dpi, name, email, password } = req.body;
  const usuarioExistente = usuarios.find((user) => user.dpi === dpi);
  
  if (usuarioExistente) {
    return res.status(400).json({ error: "el DPI ya esta en uso " });
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
    return res.status(404).json({ error: "no se encontro el usuario" });
  }
  
  if (newDpi && usuarios.some((user) => user.dpi === newDpi)) {
    return res.status(400).json({ error: "El DPI ya es esta en uso intentar de nuevo" });
  }

  usuarios[usuarioIndex] = { ...usuarios[usuarioIndex], name, email, password, dpi: newDpi || dpi };
  res.status(200).json(usuarios[usuarioIndex]);
});


app.delete("/users/:dpi", authenticateJWT, (req, res) => {
  const { dpi } = req.params;
  const usuarioIndex = usuarios.findIndex((user) => user.dpi === dpi);

  if (usuarioIndex === -1) {
    return res.status(404).json({ error: "El usuario no se encuentra" });
  }

  const usuarioEliminado = usuarios.splice(usuarioIndex, 1);
  res.status(200).json(usuarioEliminado);
});


app.listen(3000, () => {
  console.log("El servidor esta corriendo");
});
