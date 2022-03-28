import React, { useState, createContext, useContext, ReactNode} from "react"

export const CoinsContext = createContext({} as any);


 type SearchContextProps = {
    search: string;
    setSearch: (search: string) => void;
}

type ChildrenContextProps= {
    children: {}
}


export default function CoinsProvider({ children }: ChildrenContextProps ){


    const [ search, setSearch ] = useState<SearchContextProps>("");

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