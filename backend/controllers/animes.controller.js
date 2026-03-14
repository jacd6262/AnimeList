// controllers/animes.controller.js
import pool from "../db.js";

//obtener animes
export const getAnimes = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM animes");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener animes" });
  }
};

//obtener anime por id
export const getAnimeById = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM animes WHERE id_anime = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: "Anime no encontrado" });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener anime" });
  }
};

// Crear nuevo anime
export const createAnime = async (req, res) => {
  try {
    const {
      id_anime_genre,
      id_season,
      name,
      score,
      episodes,
      synopsis,
      mal_id
    } = req.body;

    if (!id_anime_genre || !id_season || !name || !mal_id) {
      return res.status(400).json({ error: "Campos obligatorios: id_anime_genre, id_season, name, mal_id" });
    }
    const [result] = await pool.query(
      `INSERT INTO animes (id_anime_genre, id_season, name, score, episodes, synopsis, mal_id)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id_anime_genre, id_season, name, score, episodes, synopsis, mal_id]
    );

    res.status(201).json({ message: "Anime creado exitosamente", id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear anime" });
  }
};
