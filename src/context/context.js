import { createContext, useState } from "react";

const initialData = {
  isLogged: false,
  setIsLogged: () => {},
  darkTheme: false,
  setDarkTheme: () => {},
}

const AppContext = createContext(initialData);

const AppContextProvider = ({ children }) => {
  
  const [isLogged, setIsLogged] = useState(initialData.isLogged);
  const [darkTheme, setDarkTheme] = useState(initialData.darkTheme);

  const contextData = {
    isLogged,
    setIsLogged,
    darkTheme,
    setDarkTheme
  }
 
  return (
    <AppContext.Provider value={contextData}>
      { children }
    </AppContext.Provider>
  )
}

export { AppContextProvider, AppContext };
