import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
// import { Fieldset, Panel } from "react95";

import Contracts from "../containers/Contracts";
// import FunctionInfo from "./function-info/FunctionInfo";
import OutputLog from "./output-log/OutputLog";
import AddressInfo from "./address-info/AddressInfo";
import FunctionList from "./function-info/FunctionList";
import FunctionDetails from "./function-info/FunctionDetails";
import FunctionCall from "./function-call/FunctionCall";
// import useQueryStringContract from "./useQueryStringContract";

const Container = styled.div`
  flex-grow: 1;
  margin-left: 1rem;
  display: flex;
  flex-direction: row;
`;

const ContentFrame = styled.div`
  height: 100%;
  flex-grow: 3;
  margin-left: 10px;
`;

const MidContainer = styled.div`
  width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  flex-grow: 1;
`;

const Content = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-gap: 8px;
`;

const TopContainer = styled.div`
  display: flex;
  flex-grow: 1;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Main = () => {
  const { selectedContract: contract, overwriteContract } =
    Contracts.useContainer();
  const [selectedIdx, setSelectedIdx] = useState(null);
  let fns, selectedFn;
  if (contract) {
    fns = contract.abi
      .filter((x) => x.type === "function")
      .sort((a, b) => a.name.localeCompare(b.name));
    selectedFn = fns[selectedIdx];
  } else {
    fns = [];
    selectedFn = null;
  }

  useEffect(() => {
    const contracts = localStorage.getItem("contracts");
    if (!contracts) {
      return;
    }
    const result = `{"data":${contracts}}`;
    let jsonResult = JSON.parse(result).data;
    overwriteContract(jsonResult);
  }, []);

  return (
    <Container>
      <MidContainer>
        <FunctionList
          selectedIdx={selectedIdx}
          setSelectedIdx={setSelectedIdx}
          fns={fns}
        />
      </MidContainer>
      <ContentFrame>
        <Content>
          <TopContainer>
            <ColumnContainer>
              <AddressInfo />
              <FunctionDetails fn={selectedFn} />
            </ColumnContainer>
            <ColumnContainer
              style={{
                marginLeft: "0.75rem",
                flexGrow: "1"
              }}
            >
              <FunctionCall fn={selectedFn} contract={contract} />
            </ColumnContainer>
          </TopContainer>
          <OutputLog />
        </Content>
      </ContentFrame>
    </Container>
  );
};

export default Main;
