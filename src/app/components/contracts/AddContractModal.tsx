import React, { useState } from "react";
import styled from "styled-components";

import ByAbi from "./ByAbi";
import ByArtifact from "./ByArtifact";
import { DialogContent, Tabs, Tab, Box } from "@mui/material";
// import ByEtherscan from "./ByEtherscan";
// import ByPremade from "./ByPremade";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

const AddContractBtn = ({ closeModal }) => {
  const [activeTab, setActiveTab] = useState(1);
  const handleTabChange = (_: any, value: number) => setActiveTab(value);

  return (
      <DialogContent>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="add contracts ways">
          <Tab label="ABI" />
          <Tab label="JSON Artifact" />
        </Tabs>
        <TabPanel value={activeTab} index={0}>
          <ByAbi closeModal={closeModal} />
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <ByArtifact closeModal={closeModal} />
        </TabPanel>
      </DialogContent>
  );
};

export default AddContractBtn;
