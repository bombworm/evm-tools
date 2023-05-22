import React, { useEffect } from "react";
import styled from "styled-components";
import { FormControl, FormLabel, List, ListItemButton, ListItemText } from "@mui/material";

import Contracts from "../containers/Contracts";
import AddContractBtn from "./contracts/AddContractBtn";
import ConnectOptions from "./connection/ConnectOptions";

const Container = styled.div`
  width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`;

const FilesContainer = styled.div`
  overflow: auto;
  width: 100%;
  height: 100%;
`;

const Sidebar = () => {
  const { contracts, setSelectedIdx, selectedIdx, selectedContract, overwriteContract } = Contracts.useContainer();
  const handleClick = (idx) => {
    setSelectedIdx(idx);
  };
  return (
    <Container>
      <ConnectOptions />
      <FormControl
        component="fieldset" 
        variant="filled"
        sx={{
          padding: '0.75em',
          border: '2px groove #213547',
          flexGrow: "1",
          overflow: "hidden",
          paddingBottom: "35px",
          "&:before": {
            "z-index": "unset",
            width: "100%",
            height: "100%"
          }
        }}
        className=""
      >
        <FormLabel 
          component="legend" 
        >
          Contracts:
        </FormLabel>
        <FilesContainer className="contract-list">
          <List aria-label="contract list">
            {contracts.map((c, i) => (
              <ListItemButton 
                selected={selectedIdx === i}
                key={i}
                onClick={(event) => handleClick(i)}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "#88bbee",
                  }
                }}
              >
                <ListItemText primary={c.name} />
              </ListItemButton>
            ))}
          </List>
          <AddContractBtn />
        </FilesContainer>
      </FormControl>
    </Container>
  );
};

export default Sidebar;
