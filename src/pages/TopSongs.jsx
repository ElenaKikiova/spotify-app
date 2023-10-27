
import { useQuery } from "@tanstack/react-query";
import { getUserData } from "../queries/profile";
import Loading from "../ui/Loading";
import UserData from "../components/UserData";
import ErrorMessage from "../ui/ErrorMessage";
import { Box } from "@mui/material";
import { getUserDevices } from "../queries/devices";

import styles from './TopSongs.module.scss'
import UserDevices from "../components/UserDevices";

const TopSongs = () => {
  
  const userData = useQuery({
    queryKey: ['user-data'],
    queryFn: getUserData
  });

  const userDevices = useQuery({
    queryKey: ['user-devices'],
    queryFn: getUserDevices
  });

  console.log(userDevices.data)

  return (
    <Box className={`bg-accent fullscreen ${styles['content']}`}>
      <Box className={`${styles['content-box']} bg-content`}>
        { userData.isPending && <Loading />}
        { userData.isError && <ErrorMessage error={userData.error} />}
        { userData.data && <UserData data={userData.data} /> }
      </Box>
      <Box className={`${styles['content-box']} bg-content`}>
        { userDevices.isPending && <Loading />}
        { userDevices.isError && <ErrorMessage error={userDevices.error} />}
        { userDevices.data && <UserDevices devices={userDevices.data} /> }
      </Box>
    </Box>
    
  )
};

export default TopSongs;