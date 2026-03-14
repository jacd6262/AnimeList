import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Lock, User } from "lucide-react";

import { registerUser } from "@/app/registerUser";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register form submitted:", { username, email, password });
    try {
      const result = await registerUser({ username, email, password });
      console.log("Usuario registrado:", result);
      alert("Usuario creado exitosamente");
      setUsername("");
      setEmail("");
      setPassword("");
      navigate("/login");
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      alert("Hubo un error al registrar el usuario puta");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-10 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md bg-black/60 border-purple-500/30 text-gray-200 shadow-2xl shadow-purple-900/10 backdrop-blur-sm">
        <CardHeader className="space-y-1 pb-6 text-center">
          <CardTitle className="text-3xl font-black bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            Crear una cuenta
          </CardTitle>
          <CardDescription className="text-gray-400">
            Únete a AnimeList hoy mismo
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none text-gray-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Nombre de usuario
              </label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Tu alias"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="pl-10 bg-[#121212] border-purple-500/30 text-gray-100 placeholder-gray-500 focus-visible:ring-purple-600 focus-visible:border-purple-600"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none text-gray-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                <Input
                  type="email"
                  placeholder="ejemplo@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 bg-[#121212] border-purple-500/30 text-gray-100 placeholder-gray-500 focus-visible:ring-purple-600 focus-visible:border-purple-600"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none text-gray-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                <Input
                  type="password"
                  placeholder="Mínimo 8 caracteres"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 bg-[#121212] border-purple-500/30 text-gray-100 placeholder-gray-500 focus-visible:ring-purple-600 focus-visible:border-purple-600"
                />
              </div>
            </div>

          </CardContent>

          <CardFooter className="flex flex-col space-y-4 pt-8">
            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 rounded-lg transition-all duration-300 shadow-lg shadow-purple-900/20"
            >
              Registrarse
            </Button>

            <div className="text-sm text-center text-gray-400">
              ¿Ya tienes una cuenta?{" "}
              <Link to="/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                Inicia sesión aquí
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Register;
