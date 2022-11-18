import React from "react";
import { Container } from "react-bootstrap";
import { Aside } from "./modules/Aside";
import { Header } from "./modules/Header";
import { Properties } from "./modules/Properties";

const Layout = () => {
  
  return (
    <Container className="w-100 p-0">
      <Header>
        <Aside />
      </Header>
      <Properties/>
    </Container>
  );
};

export default Layout;
