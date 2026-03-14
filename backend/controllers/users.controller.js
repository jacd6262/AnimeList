// controllers/users.controller.js
import pool from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT id_user, username, email FROM users");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

// Crear un nuevo usuario
export const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log("Datos recibidos:", req.body);

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }
    // Encriptar la contraseña
    const saltRounds = 10; // nivel de seguridad
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const [result] = await pool.query(
      "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    res.status(201).json({ message: "Usuario creado", id: result.insertId });
  } catch (error) {
    console.error("Error en createUser:", error.sqlMessage || error);
    res.status(500).json({ error: "Error al crear usuario" });
  }
};

// Iniciar sesión
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email y password son obligatorios" });
    }

    // Buscar usuario por email
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const user = rows[0];

    // Comparar contraseña ingresada con el hash
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: user.id_user, username: user.username, email: user.email },
      process.env.JWT_SECRET || "tu_secreto_super_seguro",
      { expiresIn: "1h" }
    );

    // Si todo está bien, devolvemos datos básicos del usuario
    res.json({
      message: "Login exitoso",
      user: { id: user.id_user, username: user.username, email: user.email },
      token,
    });

  } catch (error) {
    console.error("Error en loginUser:", error.sqlMessage || error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};