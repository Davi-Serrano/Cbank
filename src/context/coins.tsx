import { useState, createContext, useContext} from "react"

export const CoinsContext = createContext();

export default function CoinsProvider({ children }){


    const [ search, setCoins ] = useState([]);

    return(

        <CoinsContext.Provider
        value={{
            search,
            setCoins
        }}
        > 
            
            {children}    
        
         </CoinsContext.Provider>

    )
}

export function useCoins(){
    const context = useContext(CoinsContext)
    const { search, setCoins }  = context ;

    return  { search, setCoins };
}