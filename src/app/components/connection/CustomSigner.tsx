import React, { useState } from "react";
import styled from "styled-components";
import {FormControl, FormLabel, InputLabel, Input, Button} from '@mui/material';
import Signers from "../../containers/Signers";

const CustomSigner = () => {
  const [text, setText] = useState("");
  const { attemptSetCustomSigner } = Signers.useContainer();

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
      >
        Custom Signer (optional)
      </FormLabel>
      <FormControl>
          <InputLabel shrink>Private Key / Mnemonic:</InputLabel>
          <Input
            style={{ fontSize: `12px` }}
            placeholder="turkey snow danger yearly kale..."
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
      </FormControl>
      <FormControl>
        <Button
          fullWidth
          style={{ marginTop: "12px" }}
          variant="contained"
          onClick={() => {
            attemptSetCustomSigner(text);
          }}
          disabled={text === ""}
        >
          Connect
        </Button>
      </FormControl>
    </FormControl>
  );
};

export default CustomSigner;
