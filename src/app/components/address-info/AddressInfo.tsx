import React, { useState } from "react";

import Network from "../../containers/Network";
import ContractAddress from "../../containers/ContractAddress";
import Connection from "../../containers/Connection";
import OutputLog from "../../containers/OutputLog";
import { FormControl, FormLabel, Box, Input, Divider, Button } from "@mui/material";
import { ethers } from "ethers";

const AddressInfo = () => {
  const [inputText, setInputText] = useState("");
  const { network } = Network.useContainer();
  const {
    addressFromArtifact,
    setCustomAddress,
    address,
  } = ContractAddress.useContainer();
  const { provider } = Connection.useContainer();
  const { addLogItem } = OutputLog.useContainer();

  const getProxyImpl = async () => {
    try {
      if (!address) {
        return;
      }
      const implementation = await provider?.getStorageAt(address, "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc");
      const impl = ethers.utils.hexStripZeros(implementation as string);
      if (impl != "0x") {
        addLogItem(`implementation: ${impl}`);
      }
    } catch (error) {
      console.error(error);
      addLogItem(`Error: ${error.message}`);
    }
  };
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
          <strong>Selected contract address:</strong>
        </div>
        <Box component="div" sx={{
          textOverflow: 'ellipsis',
          bgcolor: 'action.disabledBackground',
        }}>
          {address || "No valid address, function call will fail"}
        </Box>
        <Button onClick={getProxyImpl} variant="contained" color="secondary">
          ERC1967 impl
        </Button>
      </div>
    </FormControl>
  );
};

export default AddressInfo;
