import { useContext, useEffect } from "react";
import { checkIsAuth, exchangeToken, redirectToSpotifyAuthorizeEndpoint } from "../spotify-auth/auth";
import { AppContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { motion } from "framer-motion";

import globalStyles from "../ui/Global.module.scss";
import styles from "./Login.module.scss";

const Login = () => {

  const { isLogged, setIsLogged, darkTheme } = useContext(AppContext);
  const args = new URLSearchParams(window.location.search);
  const code = args.get('code');

  const navigate = useNavigate();

  useEffect(() => {
    if (code) {
      // we have received the code from spotify and will exchange it for a access_token
      exchangeToken(code).then(() => {
        setIsLogged(true);
        navigate("/top-songs");
      })
    }
    else {
      const isLogged = checkIsAuth();
      setIsLogged(isLogged);
      navigate(isLogged ? "/top-songs" : "/login");
    }
  }, [code, navigate, setIsLogged]);

  const onLoginClicked = () => {
    redirectToSpotifyAuthorizeEndpoint();
  };

  return (
    <div className={`${globalStyles["emmerge-box"]} bg`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01]
         }}
        className={`${globalStyles["emmerge-element"]} ${globalStyles["small"]} content`}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            duration: 0.3,
            delay: 1
          }}
        >
          <h1>Spotify Stats</h1>
          <div className={styles.subtitle}>For nerds like you. Powered by Spotify API</div>
          {!isLogged && <Button onClick={onLoginClicked} className={globalStyles.spotified}>Log in with Spotify</Button>}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;