import { createContext, useState } from "react";


const AppContext = createContext({
  isLogged: false,
  setIsLogged: () => {},
  darkTheme: false,
  setDarkTheme: () => {},
});

const AppContextProvider = ({ children }) => {
  
  const [isLogged, setIsLogged] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);

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
