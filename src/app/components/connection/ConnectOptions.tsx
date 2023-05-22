import React from "react";
import Connection, { options, Method } from "../../containers/Connection";
import {Select, MenuItem} from '@mui/material';

import ConnectStatus from "./ConnectStatus";
import CustomSigner from "./CustomSigner";
import ByLocalhost from "./ByLocalhost";
import ByMetaMask from "./ByMetaMask";
import ByCustomNode from "./ByCustomNode";

const ConnectOptions = () => {
  const { connection, setConnection } = Connection.useContainer();
  const onChange = (e) => setConnection(e.target.value);
  return (
    <>
        <div>Connection</div>
        <Select
          label="Connection"
          value={connection}
          onChange={onChange}
          className="connect-options"
        >
          {options.map((opt, index) => 
          <MenuItem value={opt.value} key={opt.value}>{opt.label}</MenuItem>
          )}
        </Select>
        
        <ConnectStatus />

        {connection === Method.Localhost && <ByLocalhost />}
        {connection === Method.MetaMask && <ByMetaMask />}
        {connection === Method.Custom && <ByCustomNode />}
      <CustomSigner />
    </>
  );
};

export default ConnectOptions;
