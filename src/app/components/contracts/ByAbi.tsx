import React, { useState } from "react";
import styled from "styled-components";
import { Button, TextField, FormControl, FormLabel } from "@mui/material";
import randomWords from "random-words";
import validateAbi from "../../utils/validateAbi";
import Contracts from "../../containers/Contracts";

const TabBody = styled.div`
  width: 100%;
  height: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const generateName = () => {
  const words = randomWords({ exactly: 2 });
  const name = words
    .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
    .join("");
  return name;
};

const ByAbi = ({ closeModal }) => {
  const { addByAbi } = Contracts.useContainer();
  const [rawAbi, setRawAbi] = useState("");
  const [name, setName] = useState(generateName());
  const isAbiValid = validateAbi(rawAbi);

  const addContract = () => {
    addByAbi(JSON.parse(rawAbi), name);
    closeModal();
  };
  return (
    <>
      <TabBody>
        <p>
          The Application Binary Interface (ABI) is an array of objects that
          specify how to interact with Ethereum smart contracts.
        </p>
        <TextField
          placeholder="Paste ABI here..."
          onChange={(e) => {
            setRawAbi(e.target.value);
          }}
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
            This can be anything you want and can be changed later. A random
            name is generated for your convenience.
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
            disabled={!isAbiValid || name.trim() === ""}
          >
            Add Contract by ABI
          </Button>
        </ButtonContainer>
      </TabBody>
    </>
  );
};
export default ByAbi;
