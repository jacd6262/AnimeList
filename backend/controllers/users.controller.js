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

//Agregar anime a lista de seguimiento del usuario
export const addAnimeToFollowUp = async (req, res) => {
  const { id_user, mal_id, favorite, added_to_list, season, name, genres, score, episodes, synopsis } = req.body;
  let id_anime;
  console.log(req.body, "pruebaaa");

  try {
    // 1. Buscar anime por mal_id
    let [rows] = await pool.query("SELECT * FROM animes WHERE mal_id = ?", [mal_id]);
    if (rows.length > 0) {
      id_anime = rows[0].id_anime;
    } else {

      // 2. Resolver season
      let id_season;
      const [SeasonRows] = await pool.query("SELECT id_season FROM seasons WHERE name = ?", [season]);
      if (!season) {
        // usar el id de la season "unknown"
        const [seasonRow] = await pool.query("SELECT id_season FROM seasons WHERE name = 'unknown'");
        id_season = seasonRow[0].id_season;
      } else {
        const [seasonRow] = await pool.query("SELECT id_season FROM seasons WHERE name = ?", [season]);
        if (seasonRow.length === 0) {
          return res.status(400).json({ message: "Season inválida" });
        }
        id_season = seasonRow[0].id_season;
      }


      // 3. Insertar anime
      const [InserAnime] = await pool.query(
        "INSERT INTO animes (id_season, name, score, episodes, synopsis, mal_id) VALUES (?, ?, ?, ?, ?, ?)",
        [id_season, name, score || null, episodes || null, synopsis || null, mal_id] // ✅ usa mal_id del body
      );
      id_anime = InserAnime.insertId; // ahora sí obtienes el id interno

      // 4. Manejar géneros
      for (const genreName of genres) {
        let [genRows] = await pool.query("SELECT id_anime_genre FROM animes_genres WHERE name = ?", [genreName]);
        let id_anime_genre;
        if (genRows.length > 0) {
          id_anime_genre = genRows[0].id_anime_genre;
        } else {
          const [insertGenre] = await pool.query("INSERT INTO animes_genres (name) VALUES (?)", [genreName]);
          id_anime_genre = insertGenre.insertId;
        }
        // log después de tener todos los valores
        console.log("Insertando género:", { id_anime, id_anime_genre, mal_id, genreName });
        const [exists] = await pool.query(
          "SELECT * FROM anime_genres_map WHERE id_anime = ? AND id_anime_genre = ?",
          [id_anime, id_anime_genre]
        );

        if (exists.length === 0) {
          await pool.query(
            "INSERT INTO anime_genres_map (id_anime, id_anime_genre, mal_id) VALUES (?, ?, ?)",
            [id_anime, id_anime_genre, mal_id]
          );
          console.log("Insertado género:", { id_anime, id_anime_genre, mal_id, genreName });
        } else {
          console.log("Ya existía género:", { id_anime, id_anime_genre, genreName });
        }
      }
    }

    // 5. Insertar en user_anime_list
    if (!id_user || !mal_id) {
      console.log("Error: faltan id_user o mal_id", { id_user, mal_id });
      return res.status(400).json({ message: "Faltan id_user o mal_id" });
    }

    //valores por defecto y agregar preferencias
    const status = "on_hold";
    const [result] = await pool.query(
      `INSERT INTO user_anime_list 
       (id_user, id_anime, mal_id, status, favorite, added_to_list) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id_user, id_anime, mal_id, status, favorite ?? false, added_to_list ?? true]
    );

    res.json({
      message: "Anime añadido a la lista",
      id_user_anime: result.insertId,
      data: { id_user, id_anime, status, favorite, added_to_list }
    });
  } catch (error) {
    console.error("Error en addAnimeToFollowUp:", error.sqlMessage || error.message);
    res.status(500).json({
      message: "Error al añadir anime a la lista",
      error: error.sqlMessage || error.message,
      stack: error.stack
    });
  }
};

