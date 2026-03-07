import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full bg-[#141414] text-gray-200 z-50 border-b border-white/5 shadow-md">
      <div className="flex w-full items-center justify-between px-8 py-4">
        {/* Brand / Logo placeholder */}
        <div className="text-2xl font-black text-orange-500 tracking-wider">
          ANIMELIST
        </div>
        
        <NavigationMenu>
          <NavigationMenuList className="flex gap-4">
            {/* Home */}
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/"
                className="font-medium text-sm transition-colors hover:text-orange-500 bg-transparent hover:bg-transparent focus:bg-transparent"
              >
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Animes populares */}
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/popular"
                className="font-medium text-sm transition-colors hover:text-orange-500 bg-transparent hover:bg-transparent focus:bg-transparent"
              >
                Animes Populares
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Animes de temporada */}
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/seasonal"
                className="font-medium text-sm transition-colors hover:text-orange-500 bg-transparent hover:bg-transparent focus:bg-transparent"
              >
                Animes de Temporada
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Mis favoritos */}
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/favorites"
                className="font-medium text-sm transition-colors hover:text-orange-500 bg-transparent hover:bg-transparent focus:bg-transparent"
              >
                Mis Favoritos
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Lista de seguimiento */}
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/watchlist"
                className="font-medium text-sm transition-colors hover:text-orange-500 bg-transparent hover:bg-transparent focus:bg-transparent"
              >
                Lista de Seguimiento
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Próximos estrenos */}
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/upcoming"
                className="font-medium text-sm transition-colors hover:text-orange-500 bg-transparent hover:bg-transparent focus:bg-transparent"
              >
                Próximos Estrenos
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};

export default Navbar;
