import { useContext, useMemo } from "react";
import Menu from "./Menu";

// Themes
import './Global.scss';
import { AppContext } from "../context/context";

const Page = ({ showMenu = true, children }) => {

  const { darkTheme } = useContext(AppContext);
  const theme = useMemo(() => darkTheme ? 'dark' : 'light', [darkTheme]);

  console.log(theme)

  return (
    <div className={`${theme} fullscreen`}>
      { showMenu && <Menu /> }
      <div id="container">
        <>{ children }</>
      </div>
    </div>
  );
};

export default Page;