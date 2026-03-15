import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/hooks/AuthContext";
import { LogOut, Settings } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full bg-[#141414] text-gray-200 z-50 border-b border-white/5 shadow-md">
      <div className="flex w-full items-center justify-between px-8 py-4">
        {/* Brand / Logo placeholder */}
        <div className="text-2xl font-black bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent tracking-wider">
          ANIMELIST
        </div>

        <NavigationMenu>
          <NavigationMenuList className="flex gap-4">
            {/* Home */}
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/"
                className="font-medium text-sm transition-colors hover:text-purple-400 bg-transparent hover:bg-transparent focus:bg-transparent"
              >
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Animes populares */}
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/popular"
                className="font-medium text-sm transition-colors hover:text-purple-400 bg-transparent hover:bg-transparent focus:bg-transparent"
              >
                Animes Populares
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Animes de temporada */}
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/seasonal"
                className="font-medium text-sm transition-colors hover:text-purple-400 bg-transparent hover:bg-transparent focus:bg-transparent"
              >
                Animes de Temporada
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Mis favoritos */}
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/favorites"
                className="font-medium text-sm transition-colors hover:text-purple-400 bg-transparent hover:bg-transparent focus:bg-transparent"
              >
                Mis Favoritos
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Lista de seguimiento */}
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/follow-up"
                className="font-medium text-sm transition-colors hover:text-purple-400 bg-transparent hover:bg-transparent focus:bg-transparent"
              >
                Lista de Seguimiento
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Próximos estrenos */}
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/upcoming"
                className="font-medium text-sm transition-colors hover:text-purple-400 bg-transparent hover:bg-transparent focus:bg-transparent"
              >
                Próximos Estrenos
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* User Auth Section */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              {/* Avatar Circle */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-10 h-10 rounded-full bg-purple-600 hover:bg-purple-500 flex items-center justify-center text-white font-bold transition-all duration-300 shadow-lg shadow-purple-900/40 cursor-pointer"
              >
                {user.username.charAt(0).toUpperCase()}
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#1a1025] border border-purple-500/30 rounded-md shadow-xl py-1 z-50">
                  <div className="px-4 py-2 border-b border-purple-500/20 mb-1">
                    <p className="text-sm font-medium text-white truncate">{user.username}</p>
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                  </div>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-purple-600/20 hover:text-white flex items-center gap-2 transition-colors cursor-pointer"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <Settings className="w-4 h-4" />
                    Ajustes
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/20 hover:text-red-300 flex items-center gap-2 transition-colors cursor-pointer"
                    onClick={() => {
                      logout();
                      setDropdownOpen(false);
                    }}
                  >
                    <LogOut className="w-4 h-4" />
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-3">
              <Link to="/login">
                <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white transition-all bg-transparent">
                  Iniciar sesión
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/20 transition-all">
                  Crear usuario
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
