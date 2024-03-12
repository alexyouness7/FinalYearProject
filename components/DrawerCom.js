import React, {useRef} from 'react';
import Drawer from 'react-native-drawer';
import ControlPanel from './ControlPanel'; // Make sure to import ControlPanel

const DrawerCom = () => {
  const drawerRef = useRef(null);

  const closeControlPanel = () => {
    drawerRef.current.close();
  };

  const openControlPanel = () => {
    drawerRef.current.open();
  };

  return (
    <Drawer
      type="static"
      content={<ControlPanel />} // Render ControlPanel here
      openDrawerOffset={100}
      styles={drawerStyles}
      tweenHandler={Drawer.tweenPresets.parallax}
      ref={drawerRef} // Add the ref to the Drawer component
    >
      {/* Your main content here */}
      {/* ... */}
    </Drawer>
  );
};

const drawerStyles = {
  drawer: {shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3},
};

export default DrawerCom;
