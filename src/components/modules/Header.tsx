import React from "react";
import { Container } from "react-bootstrap";


export const Header = ({ children }: any) => {
  return <Container className="p-0">{children}</Container>;
};
