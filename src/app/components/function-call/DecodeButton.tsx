import React, { useState } from "react";
import { Dialog, DialogTitle, Button } from "@mui/material";

import DecodeModal from "./DecodeModal";

const customStyles = {
  overlay: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    background: "none",
    borderRadius: "0",
    padding: "0",
  },
};

const DecodeButton = ({ contract }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Button onClick={openModal} variant="outlined" color="secondary">Decode</Button>

      <Dialog
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        PaperProps={{
          sx:{
            width: "50vw"
          }
        }}
      >
        <DialogTitle>Arguments decode</DialogTitle>
        <DecodeModal
          closeModal={closeModal}
          contract={contract}
        />
      </Dialog>
    </>
  );
};

export default DecodeButton;
