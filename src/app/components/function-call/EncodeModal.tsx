import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { DialogContent, Box } from "@mui/material";
import { ethers } from "ethers";

const DataPanel = styled(Box)`
  padding: 1rem;
  width: calc(100% - 32px);
  height: 160px;
  font-size: 14px;
  font-family: monospace;
  overflow-wrap: anywhere;
  overflow-y: auto;
`;

const EncodeModal = ({ closeModal, args, types, fn, opts }) => {
  const [encoded, setEncoded] = useState("");
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
    if (fn.inputs.length > 0) {
      try {
        const processedArgs = args.map((arg, idx) => {
          const type = types[idx];
          if (type.substring(0, 4) === "uint") return ethers.BigNumber.from(arg);
          if (type.slice(-2) === "[]") return JSON.parse(arg);
          if (type === "bool") return JSON.parse(arg);
          if (type === "tuple") return JSON.parse(arg);
          return arg;
        });
        let iface = new ethers.utils.Interface([fn])
        const callData = iface.encodeFunctionData(fn.name, processedArgs);
        setEncoded(callData);
      } catch (error) {
        console.error(error);
        setEncoded(error.message);
        setHasError(true);
      }
    } else {
      setEncoded("No inputs");
    }
  }, [args, types, fn]);

  return (
    <DialogContent>
        <div style={{ marginTop: "1rem" }}>Inputs:</div>
        <DataPanel sx={{bgcolor: 'action.disabledBackground'}}>
          {types.map((type, idx) => {
            const arg = args[idx];
            const label = fn.inputs[idx].name;
            return (
              <div key={label}>
                <div>
                  <strong>{label}</strong> (<i>{type}</i>)
                </div>
                <div>{arg}</div>
                <br />
              </div>
            );
          })}
        </DataPanel>
        <div style={{ marginTop: "1rem" }}>Encoded:</div>
        <DataPanel sx={{bgcolor: 'action.disabledBackground'}}>{encoded}</DataPanel>
    </DialogContent>
  );
};

export default EncodeModal;
