import React, { useState } from "react";
import styled from "styled-components";

import Network from "../../containers/Network";
import ContractAddress from "../../containers/ContractAddress";
import { FormControl, FormLabel, Box, Input, Divider } from "@mui/material";

const containerWidth = 475;

const AddressInfo = () => {
  const [inputText, setInputText] = useState("");
  const { network } = Network.useContainer();
  const {
    addressFromArtifact,
    setCustomAddress,
    address,
  } = ContractAddress.useContainer();
  return (
    <FormControl
      component="fieldset"
      variant="filled"
      sx={{
        padding: '0.75em',
        border: '2px groove #213547'
      }}
    >
      <FormLabel 
        component="legend" 
      >Contract Address</FormLabel>
      <Input
        placeholder="Paste the deployed contract address here..."
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
          setCustomAddress(e.target.value);
        }}
      />

      <div>
        <div style={{ marginTop: `1rem` }}>
          From artifact @ network {network?.name}{" "}
          {network && `(${network?.chainId})`}:
        </div>
        <Box component="div" sx={{
          textOverflow: 'ellipsis',
          bgcolor: 'action.disabledBackground',
        }}>
          {addressFromArtifact || "No address found in artifact"}
        </Box>
        <Divider style={{ marginTop: `1rem` }} />
        <div style={{ marginTop: `1rem` }}>
          <strong>Selected contract address:</strong>
        </div>
        <Box component="div" sx={{
          textOverflow: 'ellipsis',
          bgcolor: 'action.disabledBackground',
        }}>
          {address || "No valid address, function call will fail"}
        </Box>
      </div>
    </FormControl>
  );
};

export default AddressInfo;
