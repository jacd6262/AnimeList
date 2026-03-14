// app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import animesRoutes from "./routes/animes.routes.js";
import usersRoutes from "./routes/users.routes.js";
import seasonsRoutes from "./routes/seasons.routes.js";

dotenv.config();

const app = express();

// Configuración de CORS
app.use(cors({
  origin: "http://localhost:5173", // tu frontend
  credentials: true
}));

app.use(express.json());

// Rutas principales
app.use("/animes", animesRoutes);
app.use("/users", usersRoutes);
app.use("/seasons", seasonsRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});