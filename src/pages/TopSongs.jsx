import UserData from "../components/UserData";
import { Box } from "@mui/material";

import styles from './TopSongs.module.scss'
import UserDevices from "../components/UserDevices";

const TopSongs = () => {
  
  return (
    <Box className={`bg-accent fullscreen ${styles['content']}`}>
      <Box className={`${styles['content-box']} bg-content`} >
        <UserData />
      </Box>
      <Box className={`${styles['content-box']} bg-content`}>
        <UserDevices />
      </Box>
    </Box>
    
  )
};

export default TopSongs;