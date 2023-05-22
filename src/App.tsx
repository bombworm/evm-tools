import React from "react";
import Modal from "react-modal";
// import "./styles/global.css";
import './App.css'

import Signers from "./app/containers/Signers";
import Address from "./app/containers/Address";
import Contracts from "./app/containers/Contracts";
import Websockets from "./app/containers/Websockets";
import Connection from "./app/containers/Connection";
import Layout from "./app/components/Layout";
import Sidebar from "./app/components/Sidebar";
import Main from "./app/components/Main";
import Network from "./app/containers/Network";
import ContractAddress from "./app/containers/ContractAddress";
import OutputLog from "./app/containers/OutputLog";
Modal.setAppElement("#root");

function App() {

  return (
    <OutputLog.Provider>
      <Contracts.Provider>
        <Websockets.Provider>
          <Connection.Provider>
            <Signers.Provider>
              <Network.Provider>
                <Address.Provider>
                  <ContractAddress.Provider>
                    <Layout>
                      <Sidebar />
                      <Main />
                    </Layout>
                  </ContractAddress.Provider>
                </Address.Provider>
              </Network.Provider>
            </Signers.Provider>
          </Connection.Provider>
        </Websockets.Provider>
      </Contracts.Provider>
    </OutputLog.Provider>
  )
}

export default App
