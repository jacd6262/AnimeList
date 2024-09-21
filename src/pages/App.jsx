import { BrowserRouter, useRoutes } from "react-router-dom";
import Home from "./Home";
import Navbar from "../components/Navbar";
import Contexto1 from "../context/Contexto1";
import AnimeDetail from "../components/AnimeDetail";
const App = () => {



    const AppRoutes = () => {
        let rutes = useRoutes([
            { path: '/*', element: <Home /> },
        ]);
        return rutes;
    }

    return (
        <Contexto1>
            <BrowserRouter>
                <Navbar />
                <AppRoutes />
                <AnimeDetail/>
            </BrowserRouter>
        </Contexto1>
    )
}

export default App