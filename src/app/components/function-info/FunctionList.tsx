import React from "react";
import styled from "styled-components";
// import { Cutout } from "react95";
import {FormControl, FormLabel, List, ListItemButton, ListItemText } from '@mui/material';

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
        {fns.map((fn, i) => (
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
              <ListItemText primary={i + ". " + fn.name} />
            </ListItemButton>
          ))}
      </List>
    </FormControl>
  );
};

export default FunctionList;
