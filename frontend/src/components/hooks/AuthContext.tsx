// app/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

interface User {
    id: number;
    username: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    login: (token: string) => void;
    logout: () => void;
}

interface TokenPayload {
    id: number;
    username: string;
    email: string;
    exp: number;
    iat: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    // Restaurar usuario desde localStorage al cargar la app
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            const decodedToken = jwtDecode<TokenPayload>(storedToken);
            if (decodedToken.exp * 1000 > Date.now()) {
                setUser({
                    id: decodedToken.id,
                    username: decodedToken.username,
                    email: decodedToken.email
                })
            } else {
                localStorage.removeItem("token");
            }
        }
    }, []);

    const login = (token: string) => {
        localStorage.setItem("token", token);
        const decodedToken = jwtDecode<TokenPayload>(token);
        setUser({
            id: decodedToken.id,
            username: decodedToken.username,
            email: decodedToken.email
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
    return ctx;
};