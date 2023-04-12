import { useEffect } from "react";
import { useState } from "react";
import { createContext, useContext } from "react";


const GlobalStoreContext = createContext();

export const GlobalStoreProvider = ({ children }) => {
   


    const value = {
        
    }

    return <GlobalStoreContext.Provider value={value}>
        {children}
    </GlobalStoreContext.Provider>;
};

export const GlobalStore = () => {
    return useContext(GlobalStoreContext);
};