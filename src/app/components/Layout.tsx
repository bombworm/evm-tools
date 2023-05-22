import React from "react";
import styled from "styled-components";

const AppContainer = styled.div`
  width: 100%;
  height: calc(100vh - 2rem);
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex-grow: 1;
  display: flex;
  overflow: auto;
`;

const Layout = ({ children }) => (
    <>
      <AppContainer>
        <Container>
          <Content>{children}</Content>
        </Container>
      </AppContainer>
    </>
  );
  
export default Layout;