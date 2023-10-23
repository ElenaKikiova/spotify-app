import { useContext, useMemo } from "react";
import Menu from "./Menu";

// Themes
import globalStyles from './Global.module.scss';
import { AppContext } from "../context/context";

const Page = ({ showMenu = true, children }) => {

  const { darkTheme } = useContext(AppContext);
  const theme = useMemo(() => darkTheme ? 'dark' : 'light', [darkTheme]);

  return (
    <div className={`${globalStyles[theme]} fullscreen`}>
      { showMenu && <Menu /> }
      <div id="container">
        <>{ children }</>
      </div>
    </div>
  );
};

export default Page;