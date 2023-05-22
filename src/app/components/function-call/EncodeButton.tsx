import React, { useState } from "react";
import { Dialog, DialogTitle, Button } from "@mui/material";

import EncodeModal from "./EncodeModal";

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

const EncodeButton = ({ args, types, inputs, opts }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Button onClick={openModal}>Encode</Button>

      <Dialog
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle>Arguments encode</DialogTitle>
        <EncodeModal
          closeModal={closeModal}
          args={args}
          types={types}
          inputs={inputs}
          opts={opts}
        />
      </Dialog>
    </>
  );
};

export default EncodeButton;
