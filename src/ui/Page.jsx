import { useContext, useMemo } from "react";
import Menu from "./Menu";

// Themes
import styles from './Page.module.scss';
import { AppContext } from "../context/context";

const Page = ({ children }) => {

  const { darkTheme } = useContext(AppContext);
  const theme = useMemo(() => {
    console.log(darkTheme)
    return darkTheme ? 'dark' : 'light';
  }, [darkTheme]);

  return <div className={styles[theme]}>
    <Menu />
    <>{ children }</>
  </div>
};

export default Page;