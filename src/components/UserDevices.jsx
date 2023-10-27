import { useMemo } from "react";

import styles from './UserDevices.module.scss';
import { Box, Button } from "@mui/material";
import { ComputerOutlined, SmartphoneOutlined } from "@mui/icons-material";

const UserDevices = ({ devices }) => {

  const deviceIcons = {
    'Smartphone': <SmartphoneOutlined />,
    'Computer': <ComputerOutlined />
  }

  return <>
    <div className={`${styles.userDevices} content`}>
      <h2>User Devices</h2>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        {
          devices && devices.length > 0 ? (
          <ul className={styles['userDevices--list']}>
            {
              devices.map((device) => (
                <li key={device.id} className={device.is_active ? styles['active'] : ''}>
                  { deviceIcons[device.type] }
                  <div className={styles['userDevices--device-line']}>{ device.name }</div>
                  <div className={styles['userDevices--device-line']}>{ device.type }</div>
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
  </>
};

export default UserDevices;