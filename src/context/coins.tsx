import React, { useState, createContext, useContext } from "react"

export const CoinsContext = createContext({} as SearchContextProps);

type SearchContextProps = {
    search: string;
    setSearch: (search: string) => void; 
}

type ChildrenContextProps= {
    children: {}
}

export default function CoinsProvider({ children }: ChildrenContextProps ){

    const [ search, setSearch ] = useState<string>("");

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