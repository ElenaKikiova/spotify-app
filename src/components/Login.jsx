import { useEffect, useState } from "react";
import { exchangeToken, generateCodeChallenge, getAccessToken, getExpiresAt, getRefreshToken, logout, redirectToSpotifyAuthorizeEndpoint } from "../spotify-auth/auth";
import Page from "../ui/Page";
import { getUserData } from "../queries/profile";

const Login = () => {

  const [isLogged, setIsLogged] = useState(false);
  const args = new URLSearchParams(window.location.search);
  const code = args.get('code');

  const fetchUserData = () => {
    console.log('yay', getAccessToken(), getRefreshToken());
    getUserData();
  }

  useEffect(() => {
    console.log(code)
    if (code) {
      console.log(code);
      // we have received the code from spotify and will exchange it for a access_token
      exchangeToken(code);
      setIsLogged(true);
    }
    else if (getAccessToken() && getRefreshToken()) {
      if(getExpiresAt() <= new Date()){
        console.log('logout')
        logout();
      }
      else{
        console.log('logged in')
        setIsLogged(true);
        fetchUserData();
      }
    }
    else {
      console.log('is logged')
      setIsLogged(false);
    }
  }, [])

  const onLoginClicked = () => {
    console.log(localStorage.get)
    redirectToSpotifyAuthorizeEndpoint();
  };


  return <Page>
    <h1>Login</h1>
    {!isLogged && <button onClick={onLoginClicked}>Login with Spotify</button>}
    
  </Page>
};

export default Login;