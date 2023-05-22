import React, { useState } from "react";
import styled from "styled-components";
import { Button, DialogTitle, Dialog } from "@mui/material";

import AddContractModal from "./AddContractModal";

const Container = styled.div`
  width: calc(100% - 20px);
  position: absolute;
  bottom: 5px;
`;

const AddContractBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <Container>
      <Button onClick={openModal} fullWidth variant="contained">
        Add Contract
      </Button>

      <Dialog
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <DialogTitle id="form-dialog-title">Add Contracts</DialogTitle>
          <AddContractModal closeModal={closeModal} />
      </Dialog>
    </Container>
  );
};

export default AddContractBtn;
