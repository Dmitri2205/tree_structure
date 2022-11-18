import React from "react";
import { Container } from "react-bootstrap";
import { Aside } from "./modules/Aside";
import { Header } from "./modules/Header";

const Layout = () => {
  
  return (
    <Container>
      <Header>
        <Aside />
      </Header>
    </Container>
  );
};

export default Layout;
