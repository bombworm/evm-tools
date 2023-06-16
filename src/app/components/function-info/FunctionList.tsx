import React from "react";
import styled from "styled-components";
// import { Cutout } from "react95";
import {FormControl, FormLabel, List, ListItemButton, ListItemText } from '@mui/material';
import { ethers } from 'ethers';

const FunctionList = ({ fns, selectedIdx, setSelectedIdx }) => {
  return (
    <FormControl
      component="fieldset" 
      variant="filled"
      sx={{
        padding: '0.75em',
        border: '2px groove #213547',
        flexGrow: 1,
        // maxHeight: "50vh",
        overflow: 'auto'
      }}
    >
      <FormLabel 
        component="legend" 
        // htmlFor="residence-type-radio"
      >
        Functions (arity):
      </FormLabel>
      <List aria-label="contract list">
        {fns.map((fn, i) => {
          const signature = `${fn.name}(${fn.inputs.map((input: any) => input.type).join(',')})`;
          const sigHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(signature)).substr(0, 10);
          return (
            <ListItemButton
              key={i + fn.name}
              selected={selectedIdx === i}
              onClick={() => setSelectedIdx(i)}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "#88bbee",
                }
              }}
            >
              <ListItemText primary={i + ". " + fn.name} secondary={sigHash} />
            </ListItemButton>
          )
          })}
      </List>
    </FormControl>
  );
};

export default FunctionList;
