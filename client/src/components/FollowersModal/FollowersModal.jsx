import React from "react";
import {  Modal, useMantineTheme } from "@mantine/core";
import Loader from "../Loader/Loader";

import FollowersCard from "../FollowersCard/FollowersCard";

const FollowersModal = ({ modalOpened, setModalOpened, location}) => {
  // const loading = useSelector((state) => state.authReducer.loading);
  const theme = useMantineTheme();


  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
    
        <FollowersCard location={location} modalOpened={modalOpened} />
      
    </Modal>
  );
};

export default FollowersModal;
