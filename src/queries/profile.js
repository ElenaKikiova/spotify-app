import { getAccessToken } from "../spotify-auth/auth";
import httpWrapper from "./httpWrapper";

const getUserData = async () => {
  // const response = await fetch('https://api.spotify.com/v1/me', {
  //   headers: {
  //     Authorization: 'Bearer ' + getAccessToken(),
  //   }
  // });
  
  // if (!response.ok) {
  //   const error = new Error('An error occurred while fetching the events');
  //   error.code = response.status;
  //   error.info = await response.json();
  //   throw error;
  // };

  // const data = await response.json();

  // console.log(data);
  // return data;

  const data = await httpWrapper('/me', 'Error while fetching user info');
  return data;
}

export { getUserData };