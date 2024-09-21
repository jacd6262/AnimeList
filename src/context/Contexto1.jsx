import { useState } from "react";
import { createContext } from "react"

export const Contexto1Context = createContext();

const Contexto1 = ({children}) => {
    const [animeContext, setAnimeContext] = useState({});
    const [isAnimeDetail, setIsAnimeDetail] = useState(false);

  return (
    <Contexto1Context.Provider 
    value={{
        animeContext,
        setAnimeContext,
        isAnimeDetail,
        setIsAnimeDetail
    }}
    >
      {children}
    </Contexto1Context.Provider>
  )
}

export default Contexto1