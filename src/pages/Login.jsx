import { useContext, useEffect } from "react";
import { checkIsAuth, exchangeToken, redirectToSpotifyAuthorizeEndpoint } from "../spotify-auth/auth";
import Page from "../ui/Page";
import { AppContext } from "../context/context";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const { isLogged, setIsLogged } = useContext(AppContext);
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
    <Page>
      <h1>Login</h1>
      {!isLogged && <button onClick={onLoginClicked}>Login with Spotify</button>}
    </Page>
  );
};

export default Login;