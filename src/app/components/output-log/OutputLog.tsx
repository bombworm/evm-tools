import React from "react";
import styled from "styled-components";
import OutputLogContainer from "../../containers/OutputLog";
import { FormControl, FormLabel, Button } from "@mui/material";

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  position: relative;
  margin-left: 16px;
`;

const Content = styled.pre`
  position: absolute;
  top: 16px;
  left: 12px;
  right: 16px;
  bottom: 12px;
  overflow: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column-reverse;

  font-family: monospace;
  font-size: 12px;
`;

const LogItem = styled.div`
  overflow-wrap: anywhere;
  white-space: normal;
`;

const LogItemJSON = styled.code`
  overflow-wrap: anywhere;
`;

const ClearButton = styled(Button)`
  position: absolute;
  top: 16px;
  right: 16px;
`;

const OutputLog = () => {
  const { logItems, clear } = OutputLogContainer.useContainer();
  return (
    <FormControl
      component="fieldset" 
      variant="filled"
      sx={{
        padding: '0.75em',
        border: '2px groove #213547',
        display: "flex",
        flexGrow: "1",
      }}
    >
      <FormLabel 
        component="legend" 
      >
        Log
      </FormLabel>
      <Content className="output-log">
        {logItems.map((logItem, i) => {
          if (logItem.type === "normal") {
            return (
              <LogItem key={i} className="output-log-item">
                {logItem.message}
              </LogItem>
            );
          }

          if (logItem.type === "JSON") {
            return (
              <LogItemJSON key={i} className="output-log-item">
                {logItem.message}
              </LogItemJSON>
            );
          }
        })}
      </Content>
      <Button onClick={clear} variant="contained">Clear</Button>
    </FormControl>
  );
};

export default OutputLog;
