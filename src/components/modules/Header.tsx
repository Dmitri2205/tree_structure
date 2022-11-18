import React, { useState } from "react";
import { Container, Row, Col, Button, Offcanvas } from "react-bootstrap";

interface IHeaderProps {
    children?:any
}

export const Header = ({children}: IHeaderProps) => {
    const [treeShown, setTreeShown] = useState<boolean>(false);

    const clickHandler = (type: string | undefined = undefined): any => {
      setTreeShown(!treeShown);
    };
    
    return (
        <Container className="p-0">
            {children}
        </Container>
    )
};