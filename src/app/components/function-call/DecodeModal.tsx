import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { DialogContent, Box, TextField, Button } from "@mui/material";
import { ethers } from "ethers";
import abiDecoder from "abi-decoder";
// import DecodeDetail from "./DecodeDetail";

const DataPanel = styled(Box)`
  padding: 1rem;
  width: calc(100% - 32px);
  height: 160px;
  font-size: 14px;
  font-family: monospace;
  overflow-wrap: anywhere;
  overflow-y: auto;
`;

const ParamItem = styled.code`
  font-size: 12px;
  font-family: monospace;
  margin-left: 5px;
  display: block;
`;

interface DecodeDetailProps {
  children?: React.ReactNode;
  decoded: any;
}

function DecodeDetail({decoded}) {
  return decoded.params?.length > 0 && (
    <>
        <b>Name: </b><span>{decoded["name"]}</span>
        {decoded.params.map((p, i) => {
            return (
                <ParamItem
                  key={p.name}
                >
                  [{i}]<i>{p.name}:</i> {p.value}
                </ParamItem>
            );
        })}
    </>
  );
}

const DecodeModal = ({ closeModal, contract }) => {
  const [encoded, setEncoded] = useState("");
  const [hasError, setHasError] = useState(false);
  const [decoded, setDecoded] = useState({})

  const decodeData = async () => {
    try{
      abiDecoder.addABI(contract.abi);
      const decoded = abiDecoder.decodeMethod(encoded);
      setDecoded(decoded)
    } catch(error) {
      console.error(error);
      setDecoded({message:error.message});
      setHasError(true);
    }
  }

  return (
    <DialogContent sx={{
      display: "flex",
      flexDirection: "column",
      rowGap: "10px",
    }}>
        <div style={{ marginTop: "1rem" }}>Inputs:</div>
        <div>
          <TextField
            placeholder="Paste ABI here..."
            onChange={(e) => {
              setEncoded(e.target.value);
            }}
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={encoded}
          />
        </div>
        <div>
          <Button onClick={decodeData} className="function-submit-btn" variant="contained">
            Decode
          </Button>
        </div>
          
        <div style={{ marginTop: "1rem" }}>Decoded:</div>
        <DataPanel sx={{bgcolor: 'action.disabledBackground'}}>
          {hasError && decoded['message']}
          {!hasError && <DecodeDetail decoded={decoded}/>}
        </DataPanel>
    </DialogContent>
  );
};

export default DecodeModal;
