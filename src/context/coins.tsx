import { useState, createContext, useContext} from "react"

export const CoinsContext = createContext();

export default function CoinsProvider({ children }){


    const [ search, setSearch ] = useState([]);

    return(

        <CoinsContext.Provider
        value={{
            search,
            setSearch
        }}
        > 
            
            {children}    
        
         </CoinsContext.Provider>

    )
}

export function useCoins(){
    const context = useContext(CoinsContext)
    const { search, setSearch }  = context ;

    return  { search, setSearch };
}