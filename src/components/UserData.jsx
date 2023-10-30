import { useEffect, useState } from "react";

import styles from './UserData.module.scss';
import { Box, Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getUserData } from "../queries/profile";
import Loading from "../ui/Loading";
import ErrorMessage from "../ui/ErrorMessage";

const UserData = () => {

  const [profilePic, setProfilePic] = useState();
  const [greeting, setGreting] = useState();

  const { data, isPending, isError, error} = useQuery({
    queryKey: ['user-data'],
    queryFn: getUserData
  });

  useEffect(() => {
    if(data){
      setProfilePic(data.images.length > 1 ? data.images[1].url : data.images[0].url);
      let hours = new Date().getHours();
      let greeting = "";
      if(hours < 11) greeting = "Good morning";
      else if(hours < 15) greeting = "Hello";
      else if(hours < 18) greeting = "Good afternoon";
      else if(hours < 24) greeting = "Good evening";
      setGreting(greeting);
    }
  }, [data])

  const goToSpotifyAccount = () => {
    window.open(data.external_urls?.spotify, '_blank');
  }

  return (
    <>
      { isPending && <Loading />}
      { isError && <ErrorMessage error={error} />}
      { data && (
        <div className={`${styles.userData} content`}>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <div 
              className={styles['userData--profilePic']}
              style={{'backgroundImage': `url(` + profilePic + `)`}}>
            </div>
            <h2 className={styles.userData}>
              {greeting}, <br/> { data.display_name }!
            </h2>     
          </Box>
            
          <Button onClick={goToSpotifyAccount} className="spotified">Open in Spotify</Button>
        </div>
      )}
    </>
  )
};

export default UserData;