import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import styled from "styled-components";
import { FormControl, FormLabel, Button, Checkbox, Input, FormControlLabel } from "@mui/material";

import OutputLog from "../../containers/OutputLog";
import EncodeButton from "./EncodeButton";
import DecodeButton from "./DecodeButton";
import useFormData from "./useFormData";
import useCallFunction from "./useCallFunction";

const Content = styled.div`
  position: absolute;
  top: 16px;
  left: 12px;
  right: 16px;
  bottom: 12px;
  overflow: auto;
  overflow-x: hidden;
  text-align: left;
`;

const FunctionForm = ({ fn, contract }) => {
  const { addLogItem } = OutputLog.useContainer();
  const [formState, setFormState] = useState({});
  const [ethToSend, setEthToSend] = useState("");
  const [gasLimit, setGasLimit] = useState("");
  const [blockTag, setBlockTag] = useState("");
  const [showGasLimit, setShowGasLimit] = useState(false);
  const [showBlockTag, setShowBlockTag] = useState(false);
  const [callStatic, setCallStatic] = useState(false);

  // gather form data and its respective types
  const { args, types } = useFormData(fn, formState);

  // set options for transaction
  const opts: any = {};
  if (ethToSend !== "") opts.value = ethers.utils.parseEther(ethToSend);
  if (gasLimit !== "" && showGasLimit) opts.gasLimit = parseInt(gasLimit);
  if (blockTag !== "" && blockTag) opts.blockTag = blockTag;
  if (callStatic) opts.callStatic = true;

  // get the function to call when user hits submit
  const { callFunction } = useCallFunction(args, types, fn, opts);

  // clear formState when function changes
  useEffect(() => {
    setFormState({});
  }, [fn]);

  if (!fn) {
    return (
      <FormControl
        component="fieldset" 
        variant="filled"
        sx={{
          padding: '0.75em',
          border: '2px groove #213547',
          flexGrow: 1,
          maxHeight: "100%",
          overflow: 'auto'
        }}
      >
        <FormLabel 
          component="legend" 
        >
          Call function
        </FormLabel>
        <p>Please select a function.</p>
      </FormControl>
    );
  }

  const handleInputChange = (idx, value) => {
    setFormState((prev) => ({ ...prev, [idx]: value }));
  };

  const handleSubmit = async () => {
    try {
      await callFunction();
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
        border: '2px groove #213547',
        flexGrow: 1,
        overflow: 'auto'
      }}
    >
      <FormLabel 
        component="legend" 
      >
        Call function
      </FormLabel>
      <Content>
        {fn.inputs?.map((input, idx) => (
          <div key={input.name} style={{ marginBottom: `1rem` }}>
            <div>{input.name}:</div>
            <Input
              type={input.type.substring(0, 4) === "uint" ? "number" : "text"}
              placeholder={input.type}
              value={formState[idx] || ""}
              onChange={(e) => handleInputChange(idx, e.target.value)}
              className="function-form-item"
              fullWidth
            />
          </div>
        ))}
        {fn.stateMutability === "payable" && (
          <>
            <div>ETH to send:</div>
            <Input
              type="number"
              placeholder="in units of Ethers, not Wei"
              value={ethToSend}
              onChange={(e) => setEthToSend(e.target.value)}
              style={{ marginBottom: `1rem` }}
            />
          </>
        )}

        <div style={{ display: "flex", columnGap: 10 }}>
          <Button onClick={handleSubmit} className="function-submit-btn" variant="contained">
            Submit
          </Button>
          <EncodeButton
            args={args}
            types={types}
            fn={fn}
            opts={opts}
          />
          <DecodeButton
            contract={contract}
          />
        </div>
        <div style={{ display: "flex" }}>
          <FormControlLabel
            value="gasLimit"
            control={<Checkbox checked={showGasLimit} onChange={() => setShowGasLimit((p) => !p)} size="small" />}
            label="custom gas limit"
            labelPlacement="end"
          />
          <FormControlLabel
            value="blockTag"
            control={<Checkbox checked={showBlockTag} onChange={() => setShowBlockTag((p) => !p)} size="small" />}
            label="custom blockTag"
            labelPlacement="end"
          />
        </div>
        <div style={{ display: "flex" }}>
          <FormControlLabel
            value="callStatic"
            control={<Checkbox checked={callStatic} onChange={() => setCallStatic((p) => !p)} size="small" />}
            label="callStatic"
            labelPlacement="end"
          />
        </div>

        {showGasLimit && (
          <>
            <div style={{ marginTop: `1rem` }}>Gas limit:</div>
            <Input
              type="number"
              placeholder="leave blank to use default"
              value={gasLimit}
              onChange={(e) => setGasLimit(e.target.value)}
              style={{ marginBottom: `1rem` }}
            />
          </>
        )}

        {showBlockTag && (
          <>
            <div style={{ marginTop: `1rem` }}>Block Tag:</div>
            <Input
              type="text"
              placeholder="leave blank to use default"
              value={blockTag}
              onChange={(e) => setBlockTag(e.target.value)}
              style={{ marginBottom: `1rem` }}
            />
          </>
        )}
      </Content>
    </FormControl>
  );
};

export default FunctionForm;
