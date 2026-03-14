// controllers/seasons.controller.js
import pool from "../db.js";

export const getSeasons = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM seasons");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener seasons" });
  }
};