import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // formato "Bearer token"

    if (!token) return res.status(403).json({ error: "Token requerido" });

    jwt.verify(token, process.env.JWT_SECRET || "mi_secreto_super_seguro", (err, decoded) => {
        if (err) return res.status(401).json({ error: "Token inválido" });
        req.user = decoded; // aquí tienes id, username, email
        next();
    });
};