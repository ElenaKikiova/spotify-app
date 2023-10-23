import { useMemo } from "react";

import styles from './UserData.module.scss';
import globalStyles from '../ui/Global.module.scss';
import { Box, Button } from "@mui/material";

const UserData = ({ data }) => {

  const profilePic = useMemo(() => {
    return data.images && data.images.length > 1 ? data.images[1].url : data.images[0].url
  }, [data.images]);

  const greeting = useMemo(() => {
    let hours = new Date().getHours();
    if(hours < 11) return "Good morning";
    else if(hours < 15) return "Hello";
    else if(hours < 18) return "Good afternoon";
    else if(hours < 24) return "Good evening";
  }, []);

  console.log(profilePic)

  const goToSpotifyAccount = () => {
    window.open(data.external_urls?.spotify, '_blank');
  }

  return <>
    <div className={`${styles.userData} ${globalStyles.content}`}>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <div 
          className={styles['userData--profilePic']}
          style={{'backgroundImage': `url(` + profilePic + `)`}}>
        </div>
        <h2 className={styles.userData}>
          {greeting}, <br/> { data.display_name }!
        </h2>     
      </Box>
      
      <Button onClick={goToSpotifyAccount} className={globalStyles.spotified}>Open in Spotify</Button>
    </div>
  </>
};

export default UserData;