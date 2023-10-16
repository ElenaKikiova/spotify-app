import { getAccessToken } from "../spotify-auth/auth";

function getUserData() {
  fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: 'Bearer ' + getAccessToken(),
    },
  })
    .then(async (response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw await response.json();
      }
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

export { getUserData };