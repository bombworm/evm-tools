import React, { useState } from "react";
import styled from "styled-components";
import { Button, TextField, FormControl, FormLabel } from "@mui/material";
import validateRawArtifact from "../../utils/validateRawArtifact";
import Contracts from "../../containers/Contracts";

const TabBody = styled.div`
  width: 100%;
  height: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ByAbi = ({ closeModal }) => {
  const { addByArtifact } = Contracts.useContainer();
  const [rawArtifact, setRawArtifact] = useState("");
  const [name, setName] = useState("");
  const isArtifactValid = validateRawArtifact(rawArtifact);

  const handleTextAreaChange = (e) => {
    const rawArtifact = e.target.value;
    setRawArtifact(e.target.value);
    if (validateRawArtifact(rawArtifact)) {
      setName(JSON.parse(rawArtifact).contractName);
    }
  };

  const addContract = () => {
    addByArtifact(JSON.parse(rawArtifact), name);
    closeModal();
  };
  return (
    <>
      <TabBody>
        <p>
          Dapp development tools like Buidler and Truffle produce JSON artifacts
          as a result of compiling Ethereum smart contracts.
        </p>
        <TextField
          placeholder="Paste JSON artifact here..."
          onChange={handleTextAreaChange}
          fullWidth
          multiline
          rows={4}
          variant="outlined"
        />
        <br />
        <FormControl
          component="fieldset" 
          variant="filled"
        >
          <FormLabel 
            component="legend" 
          >
            Name (required):
          </FormLabel>
          <p>
            This can be anything you want and can be changed later. We will
            infer this from your JSON artifact but you are welcome to change it.
          </p>
          <TextField
            placeholder="MyDapp"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <ButtonContainer>
          <Button
            fullWidth
            // size="lg"
            style={{ marginTop: "1rem" }}
            onClick={closeModal}
          >
            Close
          </Button>
          <Button
            fullWidth
            // size="lg"
            style={{ marginTop: "1rem" }}
            onClick={addContract}
            disabled={!isArtifactValid || name.trim() === ""}
          >
            Add Contract by Artifact
          </Button>
        </ButtonContainer>
      </TabBody>
    </>
  );
};
export default ByAbi;
