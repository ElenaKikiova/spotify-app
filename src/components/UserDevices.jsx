import { useMemo } from "react";

import styles from './UserDevices.module.scss';
import { Box, Button, Chip } from "@mui/material";
import { ComputerOutlined, SmartphoneOutlined } from "@mui/icons-material";
import Loading from "../ui/Loading";
import ErrorMessage from "../ui/ErrorMessage";
import { useQuery } from "@tanstack/react-query";
import { getUserDevices } from "../queries/player";

const UserDevices = ({ devices }) => {

  const deviceIcons = {
    'Smartphone': <SmartphoneOutlined />,
    'Computer': <ComputerOutlined />
  }
  
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['user-devices'],
    queryFn: getUserDevices
  });


  return <>
    { isPending && <Loading />}
    { isError && <ErrorMessage error={error} />}
    { data && (
      <div className={`${styles.userDevices} content`}>
        <h2>User Devices</h2>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          {
            devices && devices.length > 0 ? (
            <ul className={styles['userDevices--list']}>
              {
                devices.map((device) => (
                  <li key={device.id} className={device.is_active ? styles['active'] : ''}>
                    <Box className={styles['icon']}>{ deviceIcons[device.type] }</Box>
                    <Box className={styles['info']}>
                      <div>{ device.name }</div>
                      <div>{ device.type }</div>
                    </Box>
                  </li>
                ))
              }
            </ul>
            ) : 
            (
              <div> No devices active </div>
            )
          }
        </Box>
    </div>
    )}
    
  </>
};

export default UserDevices;