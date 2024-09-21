import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="flex justify-between items-center p-2 px-20 bg-slate-900">
        <h2 className="text-white text-2xl font-bold"><NavLink to="/">AnimeList</NavLink></h2>
        <nav className="text-white">
        <ul className="flex justify-center items-center gap-6 pr-24 ">
            <li className="hover:text-indigo-300 hover:underline underline-offset-4" ><NavLink to="/">Home</NavLink></li>
            <li className="hover:text-indigo-300 hover:underline underline-offset-4"><NavLink to="/">Minasuki</NavLink></li>
        </ul>
    </nav>
    </header>
  )
}

export default Navbar