
import { useQuery } from "@tanstack/react-query";
import { getUserData } from "../queries/profile";
import Loading from "../ui/Loading";
import UserData from "../components/UserData";
import ErrorMessage from "../ui/ErrorMessage";
import { Box } from "@mui/material";
import { getUserDevices } from "../queries/devices";

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
    <Box sx={{ display: 'grid', gridTemplateRows: 'repeat(3, 1fr)' }}>
      <Box>
        { userData.isPending && <Loading />}
        { userData.isError && <ErrorMessage error={userData.error} />}
        { userData.data && <UserData data={userData.data} /> }
      </Box>
      <Box>
        { userData.isPending && <Loading />}
        { userDevices.isError && <ErrorMessage error={userData.error} />}
        { userDevices.data && userDevices.data[0] }
      </Box>
    </Box>
    
  )
};

export default TopSongs;